import { ClassConstructor, plainToClass } from "class-transformer";

type IgnoredProps = "id" | "created" | "updated";

export function map<T, V extends Omit<T, IgnoredProps>>(
  cls: ClassConstructor<T>,
  plain: V,
): T {
  return plainToClass(cls, plain);
}
