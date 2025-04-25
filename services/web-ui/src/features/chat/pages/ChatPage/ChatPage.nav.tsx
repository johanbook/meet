import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { Nav } from "src/components/nav";

interface ChatPageNavProps {
  children: ReactNode;
}

export function ChatPageNav({ children }: ChatPageNavProps): ReactElement {
  const appBarContent = (
    <IconButton
      component={ReactRouterLink}
      sx={{
        mr: 2,
      }}
      to="/chat"
    >
      <ArrowBack />
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
