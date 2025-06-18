import React from "react";

import { Box } from "@mui/material";

export interface AuthenticationGuardNavProps {
  children: React.ReactNode;
}

export function AuthenticationGuardNav({
  children,
}: AuthenticationGuardNavProps): React.ReactElement {
  return <Box sx={{ height: "100vh", px: 3 }}>{children}</Box>;
}
