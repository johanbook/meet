import * as string from "./string";

describe("removePrefix", () => {
  it("removes prefix", () => {
    const newString = string.removePrefix("mydancer", "my");

    expect(newString).toBe("dancer");
  });

  it("returns original string if prefix not found", () => {
    const newString = string.removePrefix("mydancer", "dy");

    expect(newString).toBe("mydancer");
  });
});
