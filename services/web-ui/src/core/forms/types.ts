import { TFunction } from "i18next";

export interface FormValue<T> {
  error: string | undefined;
  touched: boolean;
  value: T;
}

export type Form<T> = {
  [K in keyof Required<T>]: FormValue<T[K]>;
};

export type ValidationResult = string | false | null;

export type Validator<T> = (
  value: T,
  props: {
    form: Form<T>;
    name: keyof T;
    t: TFunction;
  }
) => ValidationResult;

export type Validators<T> = Record<keyof T, Validator<T>>;
