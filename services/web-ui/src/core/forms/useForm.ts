import { useTranslation } from "src/core/i18n";

import { Form, FormValue, Validators } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import { getValue, toForm } from "./utils";

interface UseFormProps {
  localStorageKey?: string;
}

export function useForm<T>(
  initialValue: T,
  validators?: Validators<T>,
  options?: UseFormProps,
) {
  const [form, setForm] = useLocalStorage<Form<T>>(
    options?.localStorageKey,
    toForm(initialValue),
    {
      deserializer: (value) => toForm<T>(JSON.parse(value)),
      serializer: (value) => JSON.stringify(getValue(value)),
    },
  );

  const { t } = useTranslation("core");

  function checkIfValid() {
    return Object.values<FormValue<T[keyof T]>>(form).every(
      (value) => !value.error,
    );
  }

  /** Updates form **without** without performing any validation */
  function handleSetState(value: Partial<T>): void {
    const newForm = { ...form };

    for (const key in value) {
      newForm[key] = { ...newForm[key], touched: true, value: value[key] };
    }

    setForm(newForm);
  }

  /** Resets form to initial value */
  function handleReset(): void {
    setForm(toForm(initialValue));
  }

  /** Updates form and validates changed values */
  function handleValidation(keys: (keyof T)[]): void {
    if (!validators) {
      return;
    }

    const newForm = { ...form };

    for (const key of keys) {
      const validator = validators[key];
      const currentValue = getValue(newForm);

      const result = validator(currentValue, { form: newForm, name: key, t });

      /* eslint-disable-next-line unicorn/prefer-logical-operator-over-ternary */
      newForm[key].error = result ? result : undefined;
    }

    setForm(newForm);
  }

  /** Validates form */
  function validate(keys?: (keyof T)[]) {
    if (keys) {
      handleValidation(keys);
    } else {
      handleValidation(Object.keys(form) as (keyof T)[]);
    }

    return {
      data: getValue(form),
      isValid: checkIfValid(),
    };
  }

  return {
    isValid: checkIfValid(),
    reset: handleReset,
    setValue: handleSetState,
    state: form,
    validate,
  };
}
