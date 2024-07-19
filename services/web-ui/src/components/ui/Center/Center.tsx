import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

interface CenterProps {
  children: ReactNode;
}

export function Center({ children }: CenterProps): ReactElement {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}> {children}</Box>
  );
}
