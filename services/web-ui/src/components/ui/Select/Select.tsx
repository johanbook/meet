import React from "react";

import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";

export interface SelectProps extends Omit<MuiSelectProps, "onChange"> {
  error?: boolean;
  onChange: (value: string) => void;
}

export function Select({
  error = false,
  fullWidth = false,
  onChange,
  label,
  ...props
}: SelectProps): React.ReactElement {
  return (
    <FormControl error={error} fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        fullWidth={fullWidth}
        label={label}
        onChange={(event) => onChange(event.target.value as string)}
        {...props}
      />
    </FormControl>
  );
}
