import { useState } from "react";

import { storage } from "src/core/storage";

interface UseLocalStorageProps<T> {
  deserializer?: (value: string) => T;
  serializer?: (value: T) => string;
}

type UseLocalStorageResult<T> = [value: T, setValue: (value: T) => void];

export function useLocalStorage<T>(
  key: string | undefined,
  initialValue: T,
  options: UseLocalStorageProps<T> = {},
): UseLocalStorageResult<T> {
  const storageKey = key && `useLocalStorage::${key}`;

  const deserialize = options.deserializer || JSON.parse;
  const serialize = options.serializer || JSON.stringify;

  const [value, setValue] = useState<T>(() => {
    const storedValue = storageKey && storage.getItem(storageKey);

    const previousValue = storedValue
      ? (deserialize(storedValue) as T)
      : undefined;

    return previousValue || initialValue;
  });

  function handleSetValue(value: T): void {
    setValue(value);

    if (!storageKey) {
      return;
    }

    storage.setItem(storageKey, serialize(value));
  }

  return [value, handleSetValue];
}
