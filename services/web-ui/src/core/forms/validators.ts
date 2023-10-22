import { Validator } from "./types";

/* eslint-disable unicorn/consistent-function-scoping */

export function required<T>(): Validator<T> {
  const validator: Validator<T> = (form, { name, t }) => {
    const value = form[name];

    if (!value) {
      return t("validation.required");
    }

    return false;
  };

  return validator;
}
