import React from "react";

import { Box, Container, Toolbar } from "@mui/material";

import { AppBar } from "src/components/nav/AppBar";

interface ProfileGuardNavProps {
  children: React.ReactNode;
}

export function ProfileGuardNav({
  children,
}: ProfileGuardNavProps): React.ReactElement {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 1, height: "100%" }}>
        <Toolbar />
        <Container maxWidth="md" sx={{ height: "100%" }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
