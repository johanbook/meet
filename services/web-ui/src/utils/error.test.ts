import { describe, expect, it } from "src/test";

import { errorToMessage } from "./error";

describe(errorToMessage.name, () => {
  it("parses and formats a date", () => {
    expect(errorToMessage("foo")).toBe("foo");
    expect(errorToMessage(new Error("foo"))).toBe("foo");
  });
});
