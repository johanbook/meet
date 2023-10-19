export function sortByField<T extends object>(
  data: T[],
  getValue: (value: T) => string,
): T[] {
  const newArray = [...data];

  newArray.sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    if (aValue === bValue) {
      return 0;
    }

    return aValue < bValue ? -1 : 1;
  });

  return newArray;
}
