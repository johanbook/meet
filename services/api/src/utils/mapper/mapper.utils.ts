import { ClassConstructor, plainToClass } from "class-transformer";

const MAPPER_BASE_KEY = "__mapper";

export function getMappingKey<T>(cls: ClassConstructor<T>): string {
  return `${MAPPER_BASE_KEY}/${cls.name}`;
}

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
