import { ReactElement, ReactNode } from "react";

import {
  AppBar as MuiAppBar,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";

import { CurrentOrganizationAvatar } from "./CurrentOrganizationAvatar";

interface AppBarProps {
  appBarContent?: ReactNode;
}

export function AppBar({ appBarContent }: AppBarProps): ReactElement {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
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
    </Slide>
  );
}
