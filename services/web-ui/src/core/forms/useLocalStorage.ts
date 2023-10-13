import { useEffect, useState } from "react";

interface UseLocalStorageProps<T> {
  deserializer?: (value: string) => T;
  serializer?: (value: T) => string;
}

type UseLocalStorageResult<T> = [value: T, setValue: (value: T) => void];

export function useLocalStorage<T>(
  key: string | undefined,
  initialValue: T,
  options: UseLocalStorageProps<T> = {}
): UseLocalStorageResult<T> {
  const deserialize = options.deserializer || JSON.parse;
  const serialize = options.serializer || JSON.stringify;

  const [value, setValue] = useState<T>(() => {
    const storedValue = key && window.localStorage.getItem(key);

    const previousValue = storedValue
      ? (deserialize(storedValue) as T)
      : undefined;

    return previousValue || initialValue;
  });

  useEffect(() => {
    if (!key) {
      return;
    }

    window.localStorage.setItem(key, serialize(value));
  }, [key, value]);

  return [value, setValue];
}
