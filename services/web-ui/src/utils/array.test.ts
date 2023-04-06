import * as array from "./array";

describe("accumulate", () => {
  it("works", () => {
    const initialArray = ["a", "b", "c"];
    const accumlated = array.accumulate(
      initialArray,
      (element: string, previous = "") => previous + element
    );

    expect(accumlated).toStrictEqual(["a", "ab", "abc"]);
  });
});

describe("getLastAndRemainder", () => {
  it("handles empty array", () => {
    const [last, remainder] = array.getLastAndRemainder([]);

    expect(last).toBe(undefined);
    expect(remainder).toStrictEqual([]);
  });

  it("handles array with single element", () => {
    const initialArray = ["home"];
    const [last, remainder] = array.getLastAndRemainder(initialArray);

    expect(last).toBe("home");
    expect(remainder).toStrictEqual([]);
  });

  it("handles multiple elements", () => {
    const initialArray = [1, 2, 3];
    const [last, remainder] = array.getLastAndRemainder(initialArray);

    expect(last).toBe(3);
    expect(remainder).toStrictEqual([1, 2]);
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
