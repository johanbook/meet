export interface FormValue<T> {
  error: string | undefined;
  touched: boolean;
  value: T;
}

export type Form<T> = {
  [K in keyof Required<T>]: FormValue<T[K]>;
};

export type ValidationResult = string | false;

export type Validator<T> = (
  value: T,
  props: { form: Form<T>; name: keyof T }
) => ValidationResult;

export type Validators<T> = Record<keyof T, Validator<T>>;
