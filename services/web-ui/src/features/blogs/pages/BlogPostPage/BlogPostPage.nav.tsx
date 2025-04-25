import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { Nav } from "src/components/nav";

interface BlogPostPageNavProps {
  children: ReactNode;
}

export function BlogPostPageNav(
  { children }: BlogPostPageNavProps
): ReactElement {
  const appBarContent = (
    <>
      <IconButton
        component={ReactRouterLink}
        sx={{
          mr: 2,
        }}
        to="/"
      >
        <ArrowBack />
      </IconButton>
    </>
  );

  return <Nav appBarContent={appBarContent}>{children}</Nav>;
}
