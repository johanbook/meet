import { getRequiredIntConfig, getRequiredStringConfig } from "./config.helper";

const TEST_KEY = "my-test-key";

describe(getRequiredIntConfig.name, () => {
  it("parses int correctly", () => {
    process.env[TEST_KEY] = "3";

    const value = getRequiredIntConfig(TEST_KEY);
    expect(value).toBe(3);
  });

  it("uses default value if missing", () => {
    process.env[TEST_KEY] = undefined;

    const value = getRequiredIntConfig(TEST_KEY, 5);
    expect(value).toBe(5);
  });

  it("throws if unable to parse integer", () => {
    process.env[TEST_KEY] = "my-string";

    expect(() => getRequiredIntConfig(TEST_KEY)).toThrow();
  });
});

describe(getRequiredStringConfig.name, () => {
  it("parses string correctly", () => {
    process.env[TEST_KEY] = "my-string";

    const value = getRequiredStringConfig(TEST_KEY);
    expect(value).toBe("my-string");
  });
});
