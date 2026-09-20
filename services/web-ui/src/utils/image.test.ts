import { afterEach, beforeEach, describe, expect, it, vi } from "src/test";

import { downscaleImage } from "./image";

interface ImageStubOptions {
  mode?: "load" | "error";
  naturalWidth?: number;
  naturalHeight?: number;
}

/**
 * jsdom has no `Image` global, so the browser decode step is stubbed with a
 * minimal image that reports natural dimensions and fires its load/error
 * event asynchronously (like a real decoder would).
 */
function stubImage({
  mode = "load",
  naturalWidth = 0,
  naturalHeight = 0,
}: ImageStubOptions = {}): void {
  vi.stubGlobal(
    "Image",
    class {
      private value = "";

      private listeners: Record<string, Array<() => void>> = {};

      naturalWidth = 0;

      naturalHeight = 0;

      get src(): string {
        return this.value;
      }

      set src(sourceUrl: string) {
        this.value = sourceUrl;
        this.naturalWidth = naturalWidth;
        this.naturalHeight = naturalHeight;

        queueMicrotask(() => {
          for (const listener of this.listeners[mode] ?? []) {
            listener();
          }
        });
      }

      addEventListener(type: string, listener: () => void): void {
        const listeners = this.listeners[type] ?? [];
        listeners.push(listener);
        this.listeners[type] = listeners;
      }
    },
  );
}

/**
 * jsdom cannot draw on a canvas, so the rendering primitive is stubbed while
 * the download/encode path (canvas -> data URL -> fetch -> File) stays real.
 */
function stubCanvas() {
  const drawImage = vi.fn();
  const toDataURL = vi.fn(() => "data:image/png;base64,AQID");

  vi.spyOn(document, "createElement").mockReturnValue({
    width: 0,
    height: 0,
    getContext: () => ({ drawImage }),
    toDataURL,
  } as unknown as HTMLCanvasElement);

  return { drawImage, toDataURL };
}

describe(downscaleImage.name, () => {
  beforeEach(() => {
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:fake"),
      revokeObjectURL: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("downscales to maxWidth preserving aspect ratio and returns a JPEG file", async () => {
    const canvas = stubCanvas();
    stubImage({ naturalWidth: 2400, naturalHeight: 1600 });

    const original = new File(["photo"], "photo.jpg", {
      type: "image/jpeg",
    });
    const resized = await downscaleImage(original, 500);

    expect(resized).not.toBe(original);
    expect(resized.name).toBe("photo.jpg");
    expect(resized.type).toBe("image/jpeg");
    expect(resized.size).toBeGreaterThan(0);
    expect(canvas.drawImage).toHaveBeenCalledWith(
      expect.anything(),
      0,
      0,
      500,
      333,
    );
    expect(canvas.toDataURL).toHaveBeenCalledWith("image/jpeg", 0.85);
  });

  it("preserves aspect ratio for portrait photos", async () => {
    const canvas = stubCanvas();
    stubImage({ naturalWidth: 1600, naturalHeight: 2400 });

    await downscaleImage(
      new File(["photo"], "portrait.jpg", { type: "image/jpeg" }),
      500,
    );

    expect(canvas.drawImage).toHaveBeenCalledWith(
      expect.anything(),
      0,
      0,
      500,
      750,
    );
  });

  it("never upscales and never shrinks below one pixel", async () => {
    const canvas = stubCanvas();
    stubImage({ naturalWidth: 2, naturalHeight: 2 });

    await downscaleImage(
      new File(["photo"], "tiny.jpg", { type: "image/jpeg" }),
      1,
    );

    expect(canvas.drawImage).toHaveBeenCalledWith(
      expect.anything(),
      0,
      0,
      1,
      1,
    );
  });

  it("returns the original file unchanged when it is already small enough", async () => {
    const canvas = stubCanvas();
    stubImage({ naturalWidth: 100, naturalHeight: 80 });

    const original = new File(["photo"], "small.jpg", {
      type: "image/jpeg",
    });
    const result = await downscaleImage(original, 500);

    expect(result).toBe(original);
    expect(canvas.drawImage).not.toHaveBeenCalled();
    expect(canvas.toDataURL).not.toHaveBeenCalled();
  });

  it("returns the original file unchanged when it is exactly maxWidth", async () => {
    stubImage({ naturalWidth: 500, naturalHeight: 300 });

    const original = new File(["photo"], "exact.jpg", {
      type: "image/jpeg",
    });
    const result = await downscaleImage(original, 500);

    expect(result).toBe(original);
  });

  it("returns the original file unchanged when natural dimensions are unknown", async () => {
    const canvas = stubCanvas();
    stubImage({ naturalWidth: 0, naturalHeight: 0 });

    const original = new File(["photo"], "unknown.jpg", {
      type: "image/jpeg",
    });
    const result = await downscaleImage(original, 500);

    expect(result).toBe(original);
    expect(canvas.drawImage).not.toHaveBeenCalled();
  });

  it("returns the original file unchanged when the image fails to decode", async () => {
    stubImage({ mode: "error" });

    const original = new File(["corrupt"], "corrupt.jpg", {
      type: "image/jpeg",
    });
    const result = await downscaleImage(original, 500);

    expect(result).toBe(original);
  });

  it("returns the original file unchanged when canvas drawing is unsupported", async () => {
    stubImage({ naturalWidth: 2400, naturalHeight: 1600 });
    vi.spyOn(document, "createElement").mockReturnValue({
      width: 0,
      height: 0,
      getContext: () => {},
    } as unknown as HTMLCanvasElement);

    const original = new File(["photo"], "fallback.jpg", {
      type: "image/jpeg",
    });
    const result = await downscaleImage(original, 500);

    expect(result).toBe(original);
  });

  it("revokes the object URL after processing", async () => {
    stubCanvas();
    stubImage({ naturalWidth: 100, naturalHeight: 80 });

    await downscaleImage(
      new File(["photo"], "small.jpg", { type: "image/jpeg" }),
      500,
    );

    expect(URL.createObjectURL).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:fake");
  });
});
