import { ReactElement } from "react";

import { TextField, TextFieldProps } from "@mui/material";

export interface DatePickerProps
  extends Omit<TextFieldProps, "onChange" | "value"> {
  onChange: (date: Date) => void;
  value: Date;
}

export function DatePicker({
  onChange,
  value,
  ...props
}: DatePickerProps): ReactElement {
  // Input value is always formatted yyyy-mm-dd.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
  const stringValue = `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`;

  /* eslint-disable-next-line no-console */
  console.log({ val: stringValue });

  return (
    <TextField
      onChange={(event) => {
        onChange(new Date(event.target.value));
        /* eslint-disable-next-line no-console */
        console.log({ val: new Date(event.target.value) });
      }}
      type="date"
      value={stringValue}
      {...props}
    />
  );
}
