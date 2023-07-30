import { ClassConstructor, plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

/** Maps object array to class array **without** performing any validation */
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

/** Maps object to class **without** performing any validation */
export function map<T, V extends T>(cls: ClassConstructor<T>, plain: V): T {
  return plainToClass(cls, plain);
}

/** Maps object to class and performs validation */
export async function mapAndValidate<T extends object, V extends T>(
  cls: ClassConstructor<T>,
  plain: V,
): Promise<T> {
  const value = map(cls, plain);

  await validateOrReject(value);

  return value;
}

/** Maps object array to class array and performs validation */
export async function mapAndValidateArray<T extends object, V extends T, K>(
  cls: ClassConstructor<T>,
  data: K[],
  transform: (item: K) => V,
): Promise<T[]> {
  const promises = data.map((item) => {
    const transformed = transform(item);
    return mapAndValidate(cls, transformed);
  });

  return await Promise.all(promises);
}
