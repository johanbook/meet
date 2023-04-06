/** Removes prefix in string if present */
export function removePrefix(value: string, prefix: string): string {
  if (value.startsWith(prefix)) {
    return value.slice(prefix.length, value.length);
  }

  return value;
}
