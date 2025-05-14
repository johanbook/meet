import { describe, expect, it } from "src/test";

import * as array from "./array";

describe("accumulate", () => {
  it("works", () => {
    const initialArray = ["a", "b", "c"];
    const accumulated = array.accumulate(
      initialArray,
      (element: string, previous = "") => previous + element,
    );

    expect(accumulated).toStrictEqual(["a", "ab", "abc"]);
  });
});

describe("truncate", () => {
  it("does not truncate if array smaller than max length", () => {
    const initialArray = ["a", "b", "c"];
    const truncated = array.truncate(initialArray, 4);

    expect(truncated).toStrictEqual(initialArray);
  });

  it("truncates if array larger than max length", () => {
    const initialArray = ["a", "b", "c"];
    const truncated = array.truncate(initialArray, 2);

    expect(truncated).toStrictEqual(["a", "b"]);
  });

  it("adds optional last element if specified", () => {
    const initialArray = ["a", "b", "c"];
    const truncated = array.truncate(initialArray, 2, "d");

    expect(truncated).toStrictEqual(["a", "d"]);
  });
});
