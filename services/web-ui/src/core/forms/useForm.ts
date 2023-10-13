import { useLocalStorage } from "./useLocalStorage";
import { Form, getValue, toForm } from "./utils";

type Validators<T> = Record<keyof T, (value: T) => boolean | string>;

interface UseFormProps {
  localStorageKey?: string;
}

export function useForm<T>(
  initialValue: T,
  validators: Validators<T>,
  options?: UseFormProps
) {
  const [form, setForm] = useLocalStorage<Form<T>>(
    options?.localStorageKey,
    toForm(initialValue),
    {
      deserializer: (value) => toForm(JSON.parse(value)),
      serializer: (value) => JSON.stringify(getValue(value)),
    }
  );

  function handleSetState(value: Partial<T>): void {
    setForm({ ...form, ...value });
  }

  function handleValidation(value: T): void {
    if (!validators) {
      return;
    }

    const newForm = { ...form };

    for (const key in value) {
      const validator = validators[key];

      const result = validator(value[key] as T);

      newForm[key].error = result;
    }

    setForm(newForm);
  }

  return {
    reset: () => setForm(toForm(initialValue)),
    setValue: handleSetState,
    validate: handleValidation,
    value: form,
  };
}
