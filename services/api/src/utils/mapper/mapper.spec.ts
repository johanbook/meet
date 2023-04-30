import { map } from ".";

class TestMyClass {
  myProperty!: string;
}

describe(map.name, () => {
  it("maps properties", () => {
    const mappedClass = map(TestMyClass, { myProperty: "my-string" });
    expect(mappedClass.myProperty).toBe("my-string");
  });
});
