import { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

import { ViewDayOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { CurrentOrganizationAvatar } from "src/components/nav/AppBar/CurrentOrganizationAvatar";
import { config } from "src/config";

interface BlogPhotoListPageNavProps {
  children: ReactNode;
}

export function BlogPhotoListPageNav({
  children,
}: BlogPhotoListPageNavProps): ReactElement {
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

      <Box sx={{ flexGrow: 1 }} />

      <IconButton component={Link} to="/">
        <ViewDayOutlined />
      </IconButton>
    </>
  );

  return <Nav appBarContent={appBarContent}>{children}</Nav>;
}
