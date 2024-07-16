import React, { ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { Nav } from "src/components/nav";

interface ChatPageNavProps {
  children: ReactNode;
}

export function ChatPageNav({
  children,
}: ChatPageNavProps): React.ReactElement {
  const appBarContent = (
    <IconButton
      component={ReactRouterLink}
      sx={{
        pr: 2,
      }}
      to="/chat"
    >
      <ArrowBackIosNew sx={{ paddingRight: 1 / 2 }} />
    </IconButton>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          px: 3,
          pt: 1,
        }}
      >
        {children}
      </Box>
    </Nav>
  );
}
