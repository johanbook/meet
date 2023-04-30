import { ClassConstructor } from "class-transformer";
import "reflect-metadata";

import { getMappingKey } from "./mapper.utils";

export function Mapper<T, V>(
  source: ClassConstructor<T>,
  target: ClassConstructor<V>,
): ClassDecorator {
  const key = getMappingKey(target);

  return (mapper: object) => {
    if (Reflect.hasOwnMetadata(key, source)) {
      throw new Error(
        `Mapping for ${source.name} to ${target.name} has already been registered`,
      );
    }

    Reflect.defineMetadata(key, mapper, source);
  };
}
