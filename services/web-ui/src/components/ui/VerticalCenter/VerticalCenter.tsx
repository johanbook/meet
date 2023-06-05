import React from "react";

import { Box } from "@mui/material";

export interface VerticalCenterProps {
  children: React.ReactNode;
}

export function VerticalCenter({
  children,
}: VerticalCenterProps): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box>{children}</Box>
    </Box>
  );
}
