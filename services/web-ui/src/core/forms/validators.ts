import { ValidationResult } from "./types";

export function required<T>(value: T): ValidationResult {
  if (!value) {
    return "This field is required";
  }

  return false;
}
