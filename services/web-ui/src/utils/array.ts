/** Accumulates an array */
export function accumulate<T, R>(
  arr: T[],
  accumulator: (el: T, prev?: R) => R
): R[] {
  const newArr: R[] = [];

  let previousResult: R | undefined;

  for (const element of arr) {
    const newResult = accumulator(element, previousResult);
    newArr.push(newResult);
    previousResult = newResult;
  }

  return newArr;
}

/** Splits array and return last element and remaining arry separately */
export function getLastAndRemainder<T>(arr: T[]): [T | undefined, T[]] {
  const newArr = [...arr];
  const last = newArr.pop();
  return [last, newArr];
}

/** Truncates an array to a max length. Can add an optional last element */
export function truncate<T>(arr: T[], maxLength: number, lastElement?: T): T[] {
  if (arr.length < maxLength) {
    return arr;
  }

  if (lastElement) {
    return [...arr.slice(0, maxLength - 1), lastElement];
  }

  return arr.slice(0, maxLength);
}
