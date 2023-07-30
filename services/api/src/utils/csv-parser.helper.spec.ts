import { parseCsv } from "./csv-parser.helper";

describe(parseCsv.name, () => {
  it("parses string correctly", () => {
    const testValue = `id,name\n1,John`;
    const parsedValue = parseCsv(testValue);
    expect(parsedValue).toStrictEqual([{ id: "1", name: "John" }]);
  });
});
