/** Creates new array with only unique elements */
export function uniqify<T>(array: T[]): T[] {
  const set = new Set(array);

  return [...set];
}
