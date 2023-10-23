import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { AccountCircle, Chat, Feed } from "@mui/icons-material";
import {
  BottomNavigationAction,
  BottomNavigation as MuiBottomNavigation,
  Paper,
} from "@mui/material";

export function BottomNavigation(): React.ReactElement {
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
        <BottomNavigationAction
          component={RouterLink}
          icon={<Feed />}
          to="/"
          value="/"
        />
        <BottomNavigationAction
          component={RouterLink}
          icon={<Chat />}
          to="/chat"
          value="/chat"
        />
        <BottomNavigationAction
          component={RouterLink}
          icon={<AccountCircle />}
          to="/profile"
          value="/profile"
        />
      </MuiBottomNavigation>
    </Paper>
  );
}
