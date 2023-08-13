import { useState } from "react";

export function useForm<T>(initialValue: T) {
  const [form, setForm] = useState<T>(initialValue);

  return {
    reset: () => setForm(initialValue),
    setValue: (value: Partial<T>) => {
      setForm({ ...form, ...value });
    },
    value: form,
  };
}
