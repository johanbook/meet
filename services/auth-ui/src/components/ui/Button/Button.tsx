import { ReactElement } from "react";

import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

export function Button({
  children,
  disabled,
  loading,
  ...props
}: ButtonProps): ReactElement {
  return (
    <MuiButton disabled={disabled || loading} {...props}>
      {loading && (
        <CircularProgress size={15} sx={{ marginRight: 1 }} thickness={5} />
      )}

      {children}
    </MuiButton>
  );
}
