export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Unable to parse result"));
        return;
      }

      resolve(result);
    });

    reader.addEventListener("error", (error) => {
      reject(error);
    });

    reader.readAsDataURL(blob);
  });
}
