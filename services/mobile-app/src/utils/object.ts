export function groupBy<T extends object>(
  array: T[],
  getKey: (value: T) => number | string,
): Record<string, T[]> {
  const groups: Record<string, T[]> = {};

  for (const item of array) {
    const key = getKey(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
  }

  return groups;
}
