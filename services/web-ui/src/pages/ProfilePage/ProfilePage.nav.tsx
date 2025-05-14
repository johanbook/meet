import { ReactElement } from "react";
import { Link as ReactRouterLink } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { Nav } from "src/components/nav";

interface ProfilePageNavProps {
  children: ReactElement;
}

export function ProfilePageNav({
  children,
}: ProfilePageNavProps): ReactElement {
  const appBarContent = (
    <>
      <IconButton component={ReactRouterLink} to="/">
        <ArrowBack />
      </IconButton>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box sx={{ pt: 1 }}>{children}</Box>
    </Nav>
  );
}
