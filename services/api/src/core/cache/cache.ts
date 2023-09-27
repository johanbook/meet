import Keyv from "keyv";

export class Cache<V> {
  private cache: Keyv<V>;

  constructor(private ttlInMs = 5000) {
    this.cache = new Keyv<V>();
  }

  async delete(key: string): Promise<void> {
    await this.cache.delete(key);
  }

  async get(key: string): Promise<V | undefined> {
    return await this.cache.get(key);
  }

  async set(key: string, value: V, ttlInMs?: number): Promise<void> {
    await this.cache.set(key, value, ttlInMs || this.ttlInMs);
  }
}
