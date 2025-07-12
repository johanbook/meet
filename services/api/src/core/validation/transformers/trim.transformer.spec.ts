import { plainToClass } from "class-transformer";

import { describe, expect, it } from "src/test";

import { Trim } from "./trim.transformer";

describe("Trim", () => {
  it("should trim leading and trailing whitespace from a string", () => {
    class TestClass {
      @Trim()
      public value!: string;
    }

    const instance = plainToClass(TestClass, { value: "  hello world  " });
    expect(instance.value).toBe("hello world");
  });

  it("should not modify a value that is not a string", () => {
    class TestClass {
      @Trim()
      public value!: any;
    }

    const instance = plainToClass(TestClass, { value: 123 });
    expect(instance.value).toBe(123);
  });
});
