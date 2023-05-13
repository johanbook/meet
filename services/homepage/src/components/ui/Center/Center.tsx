import React from "react";

import { Box } from "@mui/material";

export interface CenterProps {
  children: React.ReactNode;
}

export function Center({ children }: CenterProps): React.ReactElement {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}> {children}</Box>
  );
}
