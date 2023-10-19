import { sortByField } from "./sorting.helper";

describe(sortByField.name, () => {
  it("sorts array without mutating orginal", () => {
    const originalArray = [{ name: "B" }, { name: "C" }, { name: "A" }];
    const sortedArray = sortByField(originalArray, (value) => value.name);

    expect(sortedArray).toEqual([{ name: "A" }, { name: "B" }, { name: "C" }]);
    expect(originalArray).toEqual([
      { name: "B" },
      { name: "C" },
      { name: "A" },
    ]);
  });
});
