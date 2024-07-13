import { ReactElement, ReactNode } from "react";

import { Box, Toolbar } from "@mui/material";

import { AppBar } from "src/components/nav/AppBar";
import { BottomNavigation } from "src/components/nav/BottomNavigation";

export interface NotFoundNavProps {
  children: ReactNode;
}

export function NotFoundNav({ children }: NotFoundNavProps): ReactElement {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 3, paddingTop: 1, height: "100%" }}
      >
        {children}
        <Toolbar />
      </Box>
      <BottomNavigation />
    </Box>
  );
}
