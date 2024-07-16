import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

import { Nav } from "src/components/nav";

interface CurrentProfilePageNavProps {
  children: ReactNode;
}

export function CurrentProfilePageNav({
  children,
}: CurrentProfilePageNavProps): ReactElement {
  return (
    <Nav>
      <Box sx={{ pt: 6, px: 3, mb: 3, height: "100%" }}>{children}</Box>{" "}
    </Nav>
  );
}
