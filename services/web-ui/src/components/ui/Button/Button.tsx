import { ReactElement } from "react";

import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

export function Button({
  children,
  disabled,
  isLoading,
  ...props
}: ButtonProps): ReactElement {
  return (
    <MuiButton disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <CircularProgress size={15} sx={{ marginRight: 1 }} thickness={5} />
      )}

      {children}
    </MuiButton>
  );
}
