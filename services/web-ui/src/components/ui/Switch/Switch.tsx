import React from "react";

import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";

export interface SwitchProps
  extends Omit<MuiSwitchProps, "checked" | "onChange" | "value"> {
  onChange: (value: boolean) => void;
  value: boolean;
}

export function Switch({
  onChange,
  value,
  ...props
}: SwitchProps): React.ReactElement {
  return (
    <MuiSwitch
      checked={value}
      onChange={(event) => onChange(event.target.checked)}
      {...props}
    />
  );
}
