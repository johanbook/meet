import { ClassConstructor, plainToClass } from "class-transformer";

export function mapArray<T, V extends T, K>(
  cls: ClassConstructor<T>,
  data: K[],
  transform: (item: K) => V,
): T[] {
  return data.map((item) => {
    const transformed = transform(item);
    return map(cls, transformed);
  });
}

export function map<T, V extends T>(cls: ClassConstructor<T>, plain: V): T {
  return plainToClass(cls, plain);
}
