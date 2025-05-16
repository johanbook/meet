import { describe, expect, it, vi } from "src/test";

import { cacheFn } from "./cache-function";

describe(cacheFn.name, () => {
  it("caches same value ", async () => {
    const fn = vi.fn(async (value: number) => value);

    const cachedFn = cacheFn(fn, { ttlMs: 10_000 });

    expect(await cachedFn(1)).toBe(1);
    expect(await cachedFn(1)).toBe(1);
    expect(await cachedFn(1)).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("updates value", async () => {
    const fn = vi.fn(async (value: number) => value);

    const cachedFn = cacheFn(fn, { ttlMs: 10_000 });

    expect(await cachedFn(1)).toBe(1);
    expect(await cachedFn(2)).toBe(2);
    expect(await cachedFn(3)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
