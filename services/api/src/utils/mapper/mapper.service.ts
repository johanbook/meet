import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ClassConstructor } from "class-transformer";

import { IMapper } from "./mapper.interface";
import { getMappingKey } from "./mapper.utils";

@Injectable()
export class MapperService {
  constructor(private readonly moduleRef: ModuleRef) {}

  public map<T, V>(source: T, target: ClassConstructor<V>): V {
    const key = getMappingKey(target);

    const { constructor: sourceClass } = Object.getPrototypeOf(source);

    if (!Reflect.hasOwnMetadata(key, sourceClass)) {
      throw new Error(
        `Mapping for ${sourceClass.name} to ${target.name} cannot be found. Make sure it has been registered`,
      );
    }

    const mapper: IMapper<T, V> = Reflect.getMetadata(key, sourceClass);

    const instance = this.moduleRef.get(mapper as any, { strict: false });

    /* eslint-disable-next-line unicorn/no-array-callback-reference */
    return instance.map(source, target);
  }

  public mapArray<T, V>(sources: T[], target: ClassConstructor<V>): V[] {
    return sources.map((source) => this.map(source, target));
  }
}
