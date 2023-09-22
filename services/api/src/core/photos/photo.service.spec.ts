import { readFileSync } from "node:fs";
import { join } from "node:path";

import { PhotoService } from "./photo.service";

/* eslint-disable unicorn/prefer-module */

describe(PhotoService.name, () => {
  let photoService: PhotoService;

  beforeEach(() => {
    photoService = new PhotoService(null as any);
  });

  describe("resize", () => {
    it("should resize the image buffer", async () => {
      const buffer = readFileSync(
        join(__dirname, "../../test/assets/images/dog.jpg"),
      );

      expect(buffer.byteLength).toBe(39_291);

      const options = { width: 100 };

      const result = await photoService.resize(buffer, options);

      expect(result.byteLength).toBe(30_704);
    });
  });
});
