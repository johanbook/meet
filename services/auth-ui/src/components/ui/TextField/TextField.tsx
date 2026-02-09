import React from "react";

import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export interface TextFieldProps extends Omit<
  MuiTextFieldProps,
  "error" | "onChange" | "value"
> {
  error?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  value: string;
}

export function TextField({
  error,
  maxLength,
  onChange,
  value,
  ...props
}: TextFieldProps): React.ReactElement {
  return (
    <MuiTextField
      error={Boolean(error)}
      helperText={error}
      onChange={(event) => onChange(event.target.value)}
      slotProps={{
        htmlInput: { maxLength },
        inputLabel: { shrink: true },
      }}
      value={value}
      {...props}
    />
  );
}
