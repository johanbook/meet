import { redactBinaries } from "./object.helper";

export function stringifyAndRedactBinary(
  value: unknown,
  redactedValue = "REDACTED",
): string {
  return JSON.stringify(redactBinaries(value, redactedValue));
}
