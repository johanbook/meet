interface FormValue<T> {
  error: string | boolean;
  touched: boolean;
  value: T;
}

export type Form<T> = Record<keyof T, FormValue<T[keyof T]>>;

export function toForm<T>(value: T): Form<T> {
  const form: Partial<Form<T>> = {};

  for (const key in value) {
    form[key] = {
      error: false,
      touched: false,
      value: value[key],
    };
  }

  return form as Form<T>;
}

export function getValue<T>(form: Form<T>): T {
  const value: Partial<T> = {};

  for (const key in form) {
    // @ts-expect-error TODO: Look into this
    value[key] = form[key].value;
  }

  return value as T;
}
