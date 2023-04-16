import { ClassConstructor, plainToClass } from "class-transformer";

export function map<T, V extends T>(cls: ClassConstructor<T>, plain: V): T {
  return plainToClass(cls, plain);
}
