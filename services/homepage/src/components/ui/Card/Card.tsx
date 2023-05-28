import { ReactElement } from "react";

import { Card as MuiCard, CardProps as MuiCardProps } from "@mui/material";

export interface CardProps extends Omit<MuiCardProps, "variant"> {}

export function Card(props: CardProps): ReactElement {
  return <MuiCard variant="outlined" {...props} />;
}
