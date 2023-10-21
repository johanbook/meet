export type ValidationResult = false | string;
export type Validator<T> = (value: T) => ValidationResult;
export type Validators<T> = Record<keyof T, Validator<T>>;

export interface FormValue<T> {
  error: ValidationResult;
  touched: boolean;
  value: T;
}

export type Form<T> = {
  [K in keyof Required<T>]: FormValue<T[K]>;
};
