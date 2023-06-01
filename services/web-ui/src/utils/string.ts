import { capitalize, lowerCase } from "lodash";

/** Best-effort formating for text that should be displayed */
export function format(value: string): string {
  return capitalize(lowerCase(value));
}

/** Removes prefix in string if present */
export function removePrefix(value: string, prefix: string): string {
  if (value.startsWith(prefix)) {
    return value.slice(prefix.length, value.length);
  }

  return value;
}
