import { ReactElement, ReactNode } from "react";

import { AppBar as MuiAppBar, Toolbar } from "@mui/material";

import { CurrentOrganizationAvatar } from "./CurrentOrganizationAvatar";

interface AppBarProps {
  appBarContent?: ReactNode;
}

export function AppBar({ appBarContent }: AppBarProps): ReactElement {
  return (
    <MuiAppBar
      color="inherit"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        sx={{
          display: "flex",
        }}
      >
        {appBarContent || <CurrentOrganizationAvatar />}
      </Toolbar>
    </MuiAppBar>
  );
}
