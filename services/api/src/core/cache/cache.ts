import Keyv from "keyv";

type Key = string | number;

export class Cache<V> {
  private cache: Keyv<V>;

  constructor(private ttlInMs = 5000) {
    this.cache = new Keyv<V>();
  }

  private getKey(key: Key): string {
    if (typeof key === "number") {
      return key.toString();
    }

    return key;
  }

  async delete(key: Key): Promise<void> {
    await this.cache.delete(this.getKey(key));
  }

  async get(key: Key): Promise<V | undefined> {
    return await this.cache.get(this.getKey(key));
  }

  async getOrUpdate(key: Key, getValue: () => Promise<V>): Promise<V> {
    const cachedValue = await this.get(key);

    if (cachedValue) {
      return cachedValue;
    }

    const value = await getValue();

    await this.set(key, value);

    return value;
  }

  async set(key: Key, value: V, ttlInMs?: number): Promise<void> {
    await this.cache.set(this.getKey(key), value, ttlInMs || this.ttlInMs);
  }
}
