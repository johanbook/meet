import { ReactElement, ReactNode } from "react";

import {
  AppBar as MuiAppBar,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";

import { useIsMobile } from "src/hooks/useIsMobile";

import { CurrentOrganizationAvatar } from "./CurrentOrganizationAvatar";

interface AppBarProps {
  appBarContent?: ReactNode;
}

export function AppBar({ appBarContent }: AppBarProps): ReactElement {
  const isMobile = useIsMobile();
  const trigger = useScrollTrigger();

  // Always show app bar on desktop
  const showAppBar = !isMobile || !trigger;

  return (
    <Slide appear={false} direction="down" in={showAppBar}>
      <MuiAppBar
        color="inherit"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
        }}
        variant="outlined"
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
