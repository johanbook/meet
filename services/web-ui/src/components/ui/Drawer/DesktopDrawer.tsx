import React from "react";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

interface DrawerProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 300;

export default function DesktopDrawer({
  children,
}: DrawerProps): React.ReactElement {
  return (
    <>
      <MuiDrawer
        open={true}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>{children}</Box>
      </MuiDrawer>
    </>
  );
}
