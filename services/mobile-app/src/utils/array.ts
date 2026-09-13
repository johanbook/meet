/** Accumulates an array */
export function accumulate<T, R>(
  array: T[],
  accumulator: (element: T, previous?: R) => R,
): R[] {
  const newArray: R[] = [];

  let previousResult: R | undefined;

  for (const element of array) {
    const newResult = accumulator(element, previousResult);
    newArray.push(newResult);
    previousResult = newResult;
  }

  return newArray;
}

/** Truncates an array to a max length. Can add an optional last element */
export function truncate<T>(
  array: T[],
  maxLength: number,
  lastElement?: T,
): T[] {
  if (array.length < maxLength) {
    return array;
  }

  if (lastElement) {
    return [...array.slice(0, maxLength - 1), lastElement];
  }

  return array.slice(0, maxLength);
}

/** Creates new array with only unique elements */
export function uniqify<T>(array: T[]): T[] {
  const set = new Set(array);

  return [...set];
}
