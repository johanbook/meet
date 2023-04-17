import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { AppBar } from "../AppBar";
import { BottomNavigation } from "../BottomNavigation";
import Drawer from "../Drawer";

export interface NavProps {
  children?: React.ReactNode;
  nav?: React.ReactNode;
  showBottomNav?: boolean;
}

export default function Nav({
  children,
  nav,
  showBottomNav = true,
}: NavProps): React.ReactElement {
  if (!children) {
    children = <Outlet />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar />

      {nav && <Drawer> {nav}</Drawer>}

      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 3, paddingRight: 3, paddingTop: 1 }}
      >
        <Toolbar />
        {children}
        {showBottomNav && <BottomNavigation />}
      </Box>
    </Box>
  );
}
