import React from "react";

import { Box, Container } from "@mui/material";

export interface ProfileCreationPageNavProps {
  children: React.ReactNode;
}

export function ProfileCreationPageNav({
  children,
}: ProfileCreationPageNavProps): React.ReactElement {
  return (
    <Box sx={{ padding: 2, paddingTop: 4 }}>
      <Container maxWidth="md">{children}</Container>
    </Box>
  );
}
