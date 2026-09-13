import { Validator } from "./types";

/**
 * The web app loads translations from i18next; the mobile app ships with
 * English copy, so translation keys resolve to their fallback text directly.
 */
export function t(key: string): string {
  switch (key) {
    case "validation.required":
      return "Required";
    default:
      return key;
  }
}

export function required<T>(): Validator<T> {
  const validator: Validator<T> = (form, { name }) => {
    const value = form[name];

    if (!value) {
      return t("validation.required");
    }

    return false;
  };

  return validator;
}