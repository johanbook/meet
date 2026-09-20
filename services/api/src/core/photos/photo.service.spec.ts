import { readFileSync } from "node:fs";
import path from "node:path";

import { beforeEach, describe, expect, it } from "src/test";

import { PhotoService } from "./photo.service";

describe(PhotoService.name, () => {
  let photoService: PhotoService;

  beforeEach(() => {
    photoService = new PhotoService(null as any);
  });

  describe("resize", () => {
    it("should resize the image buffer", async () => {
      const buffer = readFileSync(
        path.join(__dirname, "../../test/assets/images/dog.jpg"),
      );

      expect(buffer.byteLength).toBe(39_291);

      const options = { width: 100 };

      const result = await photoService.resize(buffer, options);

      expect(result.byteLength).toBe(5556);
      // JPEG SOI marker (FF D8); keeps the encoder from silently regressing
      expect(result[0]).toBe(255);
      expect(result[1]).toBe(216);
    });
  });
});
