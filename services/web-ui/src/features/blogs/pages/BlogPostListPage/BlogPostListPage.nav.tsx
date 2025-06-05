import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";

import { Add, DashboardOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";

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

      <Box sx={{ flexGrow: 1 }} />

      <IconButton component={Link} to="/blog/photos">
        <DashboardOutlined />
      </IconButton>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box sx={{ px: 2, py: 2 }}>
        <Button
          component={Link}
          fullWidth
          startIcon={<Add />}
          sx={{
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: 2,
            color: "white",
            p: 3,
          }}
          to="/blog/create"
          variant="outlined"
        >
          Create New Post
        </Button>
      </Box>
      {children}
    </Nav>
  );
}
