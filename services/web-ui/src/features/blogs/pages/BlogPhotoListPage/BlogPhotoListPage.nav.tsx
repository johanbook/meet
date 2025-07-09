import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";

import { ViewDayOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { CurrentOrganizationAvatar, Logo, Nav } from "src/components/nav";

interface BlogPhotoListPageNavProps {
  children: ReactNode;
}

export function BlogPhotoListPageNav({
  children,
}: BlogPhotoListPageNavProps): ReactElement {
  const appBarContent = (
    <>
      <CurrentOrganizationAvatar />

      <Logo />

      <Box sx={{ flexGrow: 1 }} />

      <IconButton component={Link} to="/">
        <ViewDayOutlined />
      </IconButton>
    </>
  );

  return (
    <Nav appBarContent={appBarContent} padding="none">
      {children}
    </Nav>
  );
}
