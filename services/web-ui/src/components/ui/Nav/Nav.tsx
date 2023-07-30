import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Container, Toolbar } from "@mui/material";

import { AppBar } from "../AppBar";
import { BottomNavigation } from "../BottomNavigation";

export interface NavProps {
  showBottomNav?: boolean;
}

export default function Nav({
  showBottomNav = true,
}: NavProps): React.ReactElement {
  return (
    <Box sx={{ height: "100vh", minHeight: "100%" }}>
      <AppBar />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 3,
          paddingRight: 3,
          paddingTop: 1,
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
          <Outlet />
        </Container>

        <Toolbar />
      </Box>

      {showBottomNav && <BottomNavigation />}
    </Box>
  );
}
