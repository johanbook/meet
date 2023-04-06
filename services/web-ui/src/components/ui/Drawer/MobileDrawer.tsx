import React from "react";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";

interface DrawerProps {
  children: React.ReactNode;
}

export default function MobileDrawer({
  children,
}: DrawerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>{children}</Box>
      </SwipeableDrawer>
    </>
  );
}
