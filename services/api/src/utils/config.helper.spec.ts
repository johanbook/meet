import { ConfigurationError } from "src/core/error-handling";
import { describe, expect, it } from "src/test";

import {
  getRequiredBooleanConfig,
  getRequiredIntConfig,
  getRequiredStringConfig,
} from "./config.helper";

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

describe(getRequiredBooleanConfig.name, () => {
  it("returns default value if missing", () => {
    delete process.env[TEST_KEY];
    expect(getRequiredBooleanConfig(TEST_KEY, true)).toBe(true);
    expect(getRequiredBooleanConfig(TEST_KEY, false)).toBe(false);
  });

  it("throws if missing and no default", () => {
    delete process.env[TEST_KEY];
    expect(() => getRequiredBooleanConfig(TEST_KEY)).toThrow(
      ConfigurationError,
    );
  });

  it("throws if env var present", () => {
    process.env[TEST_KEY] = "true";
    expect(() => getRequiredBooleanConfig(TEST_KEY)).toThrow(
      ConfigurationError,
    );
  });
});

describe(getRequiredStringConfig.name, () => {
  it("parses string correctly", () => {
    process.env[TEST_KEY] = "my-string";

    const value = getRequiredStringConfig(TEST_KEY);
    expect(value).toBe("my-string");
  });
});
