import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

import { Nav } from "src/components/nav";

interface CurrentOrganizationPageNavProps {
  children: ReactNode;
}

export function CurrentOrganizationPageNav({
  children,
}: CurrentOrganizationPageNavProps): ReactElement {
  return (
    <Nav navBackTo="/profile" title="">
      <Box sx={{ px: 2, pt: 2 }}>{children}</Box>
    </Nav>
  );
}
