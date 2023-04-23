import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { AppBar } from "../AppBar";
import { BottomNavigation } from "../BottomNavigation";

export interface NavProps {
  showBottomNav?: boolean;
}

export default function Nav({
  showBottomNav = true,
}: NavProps): React.ReactElement {
  return (
    <Box>
      <AppBar />

      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 3, paddingRight: 3, paddingTop: 1 }}
      >
        <Toolbar />
        <Outlet />
        {showBottomNav && <BottomNavigation />}
      </Box>
    </Box>
  );
}
