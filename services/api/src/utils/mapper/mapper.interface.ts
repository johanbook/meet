import { ClassConstructor } from "class-transformer";

export interface IMapper<T, V> {
  map(source: T, target: ClassConstructor<V>): V;
}
