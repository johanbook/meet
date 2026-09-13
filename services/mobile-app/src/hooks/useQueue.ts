import { useState } from "react";

interface UseQueueResult<T> {
  append: (elements: T[]) => void;
  queue: T[];
  shift: () => void;
}

export function useQueue<T>(initialData: T[]): UseQueueResult<T> {
  const [queue, setQueue] = useState<T[]>(initialData);

  function append(elements: T[]): void {
    setQueue([...queue, ...elements]);
  }

  function shift(): void {
    const [, ...rest] = queue;
    setQueue(rest);
  }

  return { append, queue, shift };
}