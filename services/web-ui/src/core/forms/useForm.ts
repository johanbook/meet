import { useLocalStorage } from "./useLocalStorage";
import { Form, FormValue, getValue, toForm } from "./utils";

type Validators<T> = Record<keyof T, (value: T) => boolean | string>;

interface UseFormProps {
  localStorageKey?: string;
}

export function useForm<T>(
  initialValue: T,
  _?: Validators<T>,
  options?: UseFormProps
) {
  const [form, setForm] = useLocalStorage<Form<T>>(
    options?.localStorageKey,
    toForm(initialValue),
    {
      deserializer: (value) => toForm<T>(JSON.parse(value)),
      serializer: (value) => JSON.stringify(getValue(value)),
    }
  );

  const isValid = Object.values<FormValue<T[keyof T]>>(form).some(
    (value) => value.error
  );

  /** Updates form **without** without performing any validation */
  function handleSetState(value: Partial<T>): void {
    const newForm = { ...form };

    for (const key in value) {
      newForm[key] = { ...newForm[key], touched: true, value: value[key] };
    }

    setForm(newForm);
  }

  /** Updates form and validates changed values */
  // function handleValidation(value: Partial<T>): void {
  //   if (!validators) {
  //     return;
  //   }

  //   const newForm = { ...form };

  //   for (const key in value) {
  //     const validator = validators[key];

  //     const result = validator(value[key] as T);

  //     newForm[key].error = result;
  //   }

  //   setForm(newForm);
  // }

  /** Validates form */
  function validate() {
    return {
      data: getValue(form),
      isValid,
    };
  }

  return {
    isValid,
    reset: () => setForm(toForm(initialValue)),
    setValue: handleSetState,
    state: form,
    validate,
  };
}
