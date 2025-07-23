import { capitalize, lowerCase } from "lodash";

import { redactBinaries } from "./object.helper";

/** Best-effort formatting for text that should be displayed */
export function format(value: string): string {
  return capitalize(lowerCase(value));
}

export function stringifyAndRedactBinary(
  value: unknown,
  redactedValue = "REDACTED",
): string {
  return JSON.stringify(redactBinaries(value, redactedValue));
}
