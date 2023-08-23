import { stringifyAndRedactBinary } from "./string.helper";

describe(stringifyAndRedactBinary.name, () => {
  it("redacts buffers", () => {
    const value = stringifyAndRedactBinary({ val: [Buffer.from([0, 1])] });
    expect(value).toBe('{"val":["REDACTED"]}');
  });
});
