const JPEG_QUALITY = 0.85;

/**
 * Downscales a photo to at most `maxWidth` wide (aspect preserved) and
 * returns it as a JPEG File.
 *
 * Returns the original file unchanged when it is already small enough or
 * cannot be decoded.
 */
export async function downscaleImage(
  file: File,
  maxWidth: number,
): Promise<File> {
  const image = new Image();
  const sourceUrl = URL.createObjectURL(file);

  try {
    image.src = sourceUrl;

    await new Promise<void>((resolve, reject) => {
      image.addEventListener("load", () => {
        resolve();
      });
      image.addEventListener("error", () => {
        reject(new Error("Failed to load image"));
      });
    });

    const scale = Math.min(1, maxWidth / image.naturalWidth);

    if (!Number.isFinite(scale) || scale >= 1) {
      return file;
    }

    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    if (!context) {
      return file;
    }

    context.drawImage(image, 0, 0, width, height);

    const dataUrl = await canvas.toDataURL("image/jpeg", JPEG_QUALITY);
    const blob = await fetch(dataUrl).then((response) => response.blob());

    return new File([blob], file.name, { type: "image/jpeg" });
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}
