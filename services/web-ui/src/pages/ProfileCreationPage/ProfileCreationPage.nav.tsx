import React from "react";

import { Container } from "@mui/material";

export interface ProfileCreationPageNavProps {
  children: React.ReactNode;
}

export function ProfileCreationPageNav({
  children,
}: ProfileCreationPageNavProps): React.ReactElement {
  return <Container maxWidth="md">{children}</Container>;
}
