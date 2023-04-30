import { ClassConstructor, plainToClass } from "class-transformer";

export class Mapper {
  public static mapArray<T, V extends T, K>(
    cls: ClassConstructor<T>,
    data: K[],
    transform: (item: K) => V,
  ): T[] {
    return data.map((item) => {
      const transformed = transform(item);
      return this.map(cls, transformed);
    });
  }

  public static map<T, V extends T>(cls: ClassConstructor<T>, plain: V): T {
    return plainToClass(cls, plain);
  }
}
