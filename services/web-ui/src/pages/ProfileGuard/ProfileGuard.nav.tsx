import React from "react";

import { Box, Container, Toolbar } from "@mui/material";

import { AppBar } from "src/components/ui/AppBar";

export interface ProfileGuardNavProps {
  children: React.ReactNode;
}

export function ProfileGuardNav({
  children,
}: ProfileGuardNavProps): React.ReactElement {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar />
      <Box component="main" sx={{ flexGrow: 1, padding: 3, paddingTop: 1 }}>
        <Toolbar />
        <Container maxWidth="md">{children}</Container>
      </Box>
    </Box>
  );
}
