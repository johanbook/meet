import { ReactElement } from "react";

import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends MuiButtonProps {}

export function Button(props: ButtonProps): ReactElement {
  return <MuiButton {...props} />;
}
