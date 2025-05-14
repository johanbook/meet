import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { Nav } from "src/components/nav";

interface CurrentOrganizationPageNavProps {
  children: ReactNode;
}

export function CurrentOrganizationPageNav({
  children,
}: CurrentOrganizationPageNavProps): ReactElement {
  const appBarContent = (
    <>
      <IconButton
        component={ReactRouterLink}
        sx={{
          mr: 2,
        }}
        to="/profile"
      >
        <ArrowBack />
      </IconButton>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box sx={{ px: 2, pt: 2 }}>{children}</Box>
    </Nav>
  );
}
