import { cacheFn, CacheFnProps } from "./cache-function";

/** Decorator for caching a function */
export function Cache(options?: CacheFnProps): any {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  return (fn: any, _: string, __: PropertyDescriptor) =>
    cacheFn(fn, { ttlMs: 1000, ...options });
}
