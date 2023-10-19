import { sortByField } from "./sorting.helper";

/* eslint-disable sonarjs/no-duplicate-string */

describe(sortByField.name, () => {
  it("sorts array without mutating orginal", () => {
    const originalArray = [{ name: "B" }, { name: "C" }, { name: "A" }];
    const sortedArray = sortByField(
      originalArray,
      (value) => value.name,
      "asc",
    );

    expect(sortedArray).toEqual([{ name: "A" }, { name: "B" }, { name: "C" }]);
    expect(originalArray).toEqual([
      { name: "B" },
      { name: "C" },
      { name: "A" },
    ]);
  });

  it("can sort based on strings (ascending)", () => {
    const originalArray = [{ name: "B" }, { name: "C" }, { name: "A" }];
    const sortedArray = sortByField(
      originalArray,
      (value) => value.name,
      "asc",
    );

    expect(sortedArray).toEqual([{ name: "A" }, { name: "B" }, { name: "C" }]);
  });

  it("can sort based on strings (descending)", () => {
    const originalArray = [{ name: "B" }, { name: "C" }, { name: "A" }];
    const sortedArray = sortByField(
      originalArray,
      (value) => value.name,
      "desc",
    );

    expect(sortedArray).toEqual([{ name: "C" }, { name: "B" }, { name: "A" }]);
  });

  it("can sort based on numbers (ascending)", () => {
    const originalArray = [{ name: 2 }, { name: 3 }, { name: 1 }];
    const sortedArray = sortByField(
      originalArray,
      (value) => value.name,
      "asc",
    );

    expect(sortedArray).toEqual([{ name: 1 }, { name: 2 }, { name: 3 }]);
    expect(originalArray).toEqual([{ name: 2 }, { name: 3 }, { name: 1 }]);
  });

  it("can sort based on numbers (descending)", () => {
    const originalArray = [{ name: 2 }, { name: 3 }, { name: 1 }];
    const sortedArray = sortByField(
      originalArray,
      (value) => value.name,
      "desc",
    );

    expect(sortedArray).toEqual([{ name: 3 }, { name: 2 }, { name: 1 }]);
    expect(originalArray).toEqual([{ name: 2 }, { name: 3 }, { name: 1 }]);
  });

  it("can sort based on dates (ascending)", () => {
    const originalArray = [
      { date: new Date("2020-01-01") },
      { date: new Date("2020-03-01") },
      { date: new Date("2020-02-01") },
    ];
    const sortedArray = sortByField(
      originalArray,
      (value) => value.date,
      "asc",
    );

    expect(sortedArray).toEqual([
      { date: new Date("2020-01-01") },
      { date: new Date("2020-02-01") },
      { date: new Date("2020-03-01") },
    ]);
    expect(originalArray).toEqual([
      { date: new Date("2020-01-01") },
      { date: new Date("2020-03-01") },
      { date: new Date("2020-02-01") },
    ]);
  });

  it("can sort based on dates (descending)", () => {
    const originalArray = [
      { date: new Date("2020-01-01") },
      { date: new Date("2020-03-01") },
      { date: new Date("2020-02-01") },
    ];
    const sortedArray = sortByField(
      originalArray,
      (value) => value.date,
      "desc",
    );

    expect(sortedArray).toEqual([
      { date: new Date("2020-03-01") },
      { date: new Date("2020-02-01") },
      { date: new Date("2020-01-01") },
    ]);
    expect(originalArray).toEqual([
      { date: new Date("2020-01-01") },
      { date: new Date("2020-03-01") },
      { date: new Date("2020-02-01") },
    ]);
  });
});
