import { ReactElement } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import {
  BottomNavigationAction,
  BottomNavigation as MuiBottomNavigation,
  Paper,
} from "@mui/material";

import { mobileNavItems } from "../nav.items";

export function BottomNavigation(): ReactElement {
  const location = useLocation();

  // Strips away ie chat id, meaning `/chat/12` -> `/chat`
  const pathname = "/" + location.pathname.split("/")[1];

  return (
    <Paper
      component="footer"
      elevation={3}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <MuiBottomNavigation value={pathname}>
        {mobileNavItems.map((item) => (
          <BottomNavigationAction
            component={RouterLink}
            icon={<item.Icon />}
            to={item.url}
            value={item.url}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
}
