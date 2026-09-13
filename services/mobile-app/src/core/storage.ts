import {
  cacheDirectory,
  deleteAsync as deleteFileAsync,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system/legacy";

// Simple key-value storage for small persisted state (session cookies,
// darkmode cache, form drafts).
//
// Reads/writes are synchronous and served from memory. On iOS/Android the
// contents are durably backed by a JSON file in the platform cache directory;
// call `loadStorage` once at startup to hydrate it. On targets without a file
// system (web preview) localStorage is used directly.
interface Storage {
  getItem(key: string): string | null;
  loadStorage(): Promise<void>;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

// cacheDirectory is normalized to end with a slash when present.
const CACHE_FILE: string | undefined =
  typeof cacheDirectory === "string"
    ? `${cacheDirectory}mobile-storage.json`
    : undefined;

class FileStorage implements Storage {
  private memory = new Map<string, string>();

  async loadStorage(): Promise<void> {
    if (!CACHE_FILE) {
      return;
    }

    let contents: string | null = null;

    try {
      contents = await readAsStringAsync(CACHE_FILE);
    } catch {
      contents = null;
    }

    if (!contents) {
      return;
    }

    try {
      const parsed = JSON.parse(contents) as Record<string, unknown>;

      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === "string") {
          this.memory.set(key, value);
        }
      }
    } catch {
      // Corrupt cache file - start fresh.
    }
  }

  private persist(): void {
    if (!CACHE_FILE) {
      return;
    }

    const contents = JSON.stringify(Object.fromEntries(this.memory));

    try {
      writeAsStringAsync(CACHE_FILE, contents);
    } catch {
      // Best effort; state is kept in memory regardless.
    }
  }

  getItem(key: string): string | null {
    return this.memory.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.memory.set(key, value);
    this.persist();
  }

  removeItem(key: string): void {
    this.memory.delete(key);
    this.persist();

    if (CACHE_FILE && this.memory.size === 0) {
      try {
        deleteFileAsync(CACHE_FILE);
      } catch {
        // Best effort.
      }
    }
  }
}

class WebStorage implements Storage {
  getItem(key: string): string | null {
    if (typeof localStorage === "undefined") {
      return null;
    }

    return localStorage.getItem(key) ?? null;
  }

  setItem(key: string, value: string): void {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.removeItem(key);
  }

  async loadStorage(): Promise<void> {
    // localStorage is live storage; nothing to hydrate.
  }
}

const isWeb = typeof window !== "undefined" && typeof document !== "undefined";

const isFileStorageAvailable = !isWeb && CACHE_FILE !== undefined;

export const storage: Storage = isFileStorageAvailable
  ? new FileStorage()
  : new WebStorage();

/** Hydrates persisted state (native only). Call once at app startup. */
export async function loadStorage(): Promise<void> {
  await storage.loadStorage();
}
