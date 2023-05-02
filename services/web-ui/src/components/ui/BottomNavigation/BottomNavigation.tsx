import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { AccountCircle, Chat, Favorite } from "@mui/icons-material";
import {
  BottomNavigationAction,
  BottomNavigation as MuiBottomNavigation,
  Paper,
} from "@mui/material";

export function BottomNavigation(): React.ReactElement {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Paper
      component="footer"
      elevation={3}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <MuiBottomNavigation value={pathname}>
        <BottomNavigationAction
          component={RouterLink}
          icon={<AccountCircle />}
          to="/profile"
          value="/profile"
        />
        :
        <BottomNavigationAction
          component={RouterLink}
          icon={<Favorite />}
          to="/"
          value="/"
        />
        :
        <BottomNavigationAction
          component={RouterLink}
          icon={<Chat />}
          to="/chat"
          value="/chat"
        />
        :
      </MuiBottomNavigation>
    </Paper>
  );
}
