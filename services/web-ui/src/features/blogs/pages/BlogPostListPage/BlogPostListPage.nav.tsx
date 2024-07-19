import { ReactElement, ReactNode } from "react";

import { Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { CurrentOrganizationAvatar } from "src/components/nav/AppBar/CurrentOrganizationAvatar";
import { config } from "src/config";

interface BlogPostListPageNavProps {
  children: ReactNode;
}

export function BlogPostListPageNav({
  children,
}: BlogPostListPageNavProps): ReactElement {
  const appBarContent = (
    <>
      <CurrentOrganizationAvatar />

      <Typography
        sx={(theme) => ({
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: "text",
          color: "transparent",
          fontFamily: "sans-serif",
          fontWeight: 600,
          ml: 3,
          textShadow: `1px 1px 1px ${theme.palette.text.primary}`,
          userSelect: "none",
        })}
        variant="h5"
      >
        {config.APP.NAME}
      </Typography>
    </>
  );

  return <Nav appBarContent={appBarContent}>{children}</Nav>;
}
