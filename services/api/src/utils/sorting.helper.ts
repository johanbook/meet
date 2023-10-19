type Direction = "asc" | "desc";
type Fn<T, V> = (value: T) => V;

function sortByNumberField<T extends object>(
  data: T[],
  getValue: Fn<T, number>,
  direction: Direction,
): T[] {
  const newArray = [...data];

  const factor = direction === "desc" ? -1 : 1;

  newArray.sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    if (aValue === bValue) {
      return 0;
    }

    return aValue < bValue ? -1 * factor : 1 * factor;
  });

  return newArray;
}

function sortByStringField<T extends object>(
  data: T[],
  getValue: Fn<T, string>,
  direction: Direction,
): T[] {
  const newArray = [...data];

  const factor = direction === "desc" ? -1 : 1;

  newArray.sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);
    return factor * aValue.localeCompare(bValue);
  });

  return newArray;
}

export function sortByField<T extends object>(
  data: T[],
  getValue: Fn<T, string> | Fn<T, number> | Fn<T, Date>,
  direction: Direction = "asc",
): T[] {
  if (data.length === 0) {
    return [];
  }

  const firstElement = getValue(data[0]);

  if (firstElement instanceof Date) {
    const getDateInMs = (value: T) => {
      const date = getValue(value) as Date;
      return date.valueOf();
    };

    return sortByNumberField(data, getDateInMs, direction);
  }

  if (typeof firstElement === "number") {
    return sortByNumberField(data, getValue as Fn<T, number>, direction);
  }

  return sortByStringField(data, getValue as Fn<T, string>, direction);
}
