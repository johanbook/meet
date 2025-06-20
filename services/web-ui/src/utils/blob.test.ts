import { describe, expect, it } from "src/test";

import { blobToBase64 } from "./blob";

describe(blobToBase64.name, () => {
  it("converts empty blob to base64 string", async () => {
    const blob = new Blob([]);
    const result = await blobToBase64(blob);
    expect(result).toBe("data:application/octet-stream;base64,");
  });

  it("converts blob with data to base64 string", async () => {
    const blob = new Blob(["hello"]);
    const result = await blobToBase64(blob);
    expect(result).toBe("data:application/octet-stream;base64,aGVsbG8=");
  });

  it("uses custom mime type if provided", async () => {
    const blob = new Blob(["test"], { type: "text/plain" });
    const result = await blobToBase64(blob);
    expect(result).toBe("data:text/plain;base64,dGVzdA==");
  });
});
