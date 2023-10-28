import { ReactElement, ReactNode, useState } from "react";

import Box from "@mui/material/Box";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";

interface SwipeableDrawerProps {
  children: ReactNode;
}

export function SwipeableDrawer({
  children,
}: SwipeableDrawerProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <MuiSwipeableDrawer
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Toolbar />
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </MuiSwipeableDrawer>
  );
}
