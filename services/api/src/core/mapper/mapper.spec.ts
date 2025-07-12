import { Length } from "class-validator";

import { describe, expect, it } from "src/test";

import { map, mapAndValidate } from "./mapper";

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

describe(mapAndValidate.name, () => {
  it("maps properties", async () => {
    class TestMyClass {
      myProperty!: string;
    }

    const mappedClass = await mapAndValidate(TestMyClass, {
      myProperty: "my-string",
    });
    expect(mappedClass.myProperty).toBe("my-string");
  });

  it("throws on invalid validation", async () => {
    class TestMyClass {
      @Length(100, 200)
      myProperty!: string;
    }

    await expect(
      mapAndValidate(TestMyClass, {
        myProperty: "my-string",
      }),
    ).rejects.toBeTruthy();
  });
});
