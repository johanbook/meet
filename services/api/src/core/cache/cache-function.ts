import { Cache } from "./cache";

export type Fn<T, V> = (props: T) => V;

function getKey(props: unknown): string {
  return JSON.stringify(props);
}

export interface CacheFnProps {
  ttlMs?: number;
}

export function cacheFn<T, V>(
  fn: Fn<T, Promise<V>>,
  options: CacheFnProps,
): Fn<T, Promise<V>> {
  const cache = new Cache<V>(options.ttlMs);

  return async (props: T) => {
    const key = getKey(props);

    const cachedValue = await cache.get(key);

    if (cachedValue) {
      return cachedValue;
    }

    const value = await fn(props);

    cache.set(key, value);

    return value;
  };
}
