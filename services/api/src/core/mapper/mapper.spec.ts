import { Length } from "class-validator";

import { map } from "./mapper";

describe(map.name, () => {
  it("maps properties", () => {
    class TestMyClass {
      myProperty!: string;
    }
    const mappedClass = map(TestMyClass, { myProperty: "my-string" });
    expect(mappedClass.myProperty).toBe("my-string");
  });

  it("does not perform validation", () => {
    class TestMyClass {
      @Length(100, 200)
      myProperty!: string;
    }

    const mappedClass = map(TestMyClass, { myProperty: "my-string" });
    expect(mappedClass.myProperty).toBe("my-string");
  });
});
