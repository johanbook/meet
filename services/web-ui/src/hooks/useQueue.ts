import React from "react";

export interface UseQueueReslut<T> {
  append: (elements: T[]) => void;
  queue: T[];
  shift: () => void;
}

export function useQueue<T>(initialData: T[]): UseQueueReslut<T> {
  const [queue, setQueue] = React.useState<T[]>(initialData);

  function append(elements: T[]): void {
    setQueue([...queue, ...elements]);
  }

  function shift(): void {
    queue.shift();
    setQueue([...queue]);
  }

  return { append, queue, shift };
}
