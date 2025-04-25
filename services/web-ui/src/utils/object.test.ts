import { describe, expect, it } from "src/test";

import { groupBy } from "./object";

describe(groupBy.name, () => {
  it("works", () => {
    const initialArray = [{ name: "a" }, { name: "b" }];
    const result = groupBy(initialArray, (item) => item.name);

    expect(result).toEqual({
      a: [{ name: "a" }],
      b: [{ name: "b" }],
    });
  });
});
