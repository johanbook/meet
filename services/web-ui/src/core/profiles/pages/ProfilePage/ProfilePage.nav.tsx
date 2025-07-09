import { ReactElement } from "react";

import { Box } from "@mui/material";

import { Nav } from "src/components/nav";

interface ProfilePageNavProps {
  children: ReactElement;
}

export function ProfilePageNav({
  children,
}: ProfilePageNavProps): ReactElement {
  return (
    <Nav navBackTo="/" title="">
      <Box sx={{ pt: 4 }}>{children}</Box>
    </Nav>
  );
}
