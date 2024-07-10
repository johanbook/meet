import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

import { AppBar } from "src/components/ui/AppBar";

export interface PrivacyPolicyPageNavProps {
  children: ReactNode;
}

export function PrivacyPolicyPageNav({
  children,
}: PrivacyPolicyPageNavProps): ReactElement {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar />
      <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
