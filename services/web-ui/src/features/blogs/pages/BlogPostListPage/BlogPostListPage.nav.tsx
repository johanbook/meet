import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";

import { DashboardOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { CurrentOrganizationAvatar, Logo, Nav } from "src/components/nav";

interface BlogPostListPageNavProps {
  children: ReactNode;
}

export function BlogPostListPageNav({
  children,
}: BlogPostListPageNavProps): ReactElement {
  const appBarContent = (
    <>
      <CurrentOrganizationAvatar />

      <Logo />

      <Box sx={{ flexGrow: 1 }} />

      <IconButton component={Link} to="/blog/photos">
        <DashboardOutlined />
      </IconButton>
    </>
  );

  return <Nav appBarContent={appBarContent}>{children}</Nav>;
}
