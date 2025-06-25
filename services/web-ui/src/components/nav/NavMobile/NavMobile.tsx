import { ReactElement, ReactNode } from "react";

import { Box, Container, Toolbar } from "@mui/material";

import { AppBar } from "src/components/nav/AppBar";

import { BottomNavigation } from "../BottomNavigation";

interface NavMobileProps {
  appBarContent?: ReactNode;
  children: ReactNode;
}

export function NavMobile({
  appBarContent,
  children,
}: NavMobileProps): ReactElement {
  return (
    <Box sx={{ height: "100vh", minHeight: "100%" }}>
      <AppBar appBarContent={appBarContent} />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Toolbar />

        <Container
          disableGutters
          maxWidth="md"
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Container>

        <Toolbar />
      </Box>

      <BottomNavigation />
    </Box>
  );
}
