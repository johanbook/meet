import React from "react";

import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export interface TextFieldProps
  extends Omit<MuiTextFieldProps, "onChange" | "value"> {
  onChange: (value: string) => void;
  value: string;
}

export function TextField({
  onChange,
  value,
  ...props
}: TextFieldProps): React.ReactElement {
  return (
    <MuiTextField
      onChange={(event) => onChange(event.target.value)}
      value={value}
      {...props}
    />
  );
}
