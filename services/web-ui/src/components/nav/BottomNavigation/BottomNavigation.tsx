import { ReactElement } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { AccountCircle, Chat, Feed } from "@mui/icons-material";
import {
  BottomNavigationAction,
  BottomNavigation as MuiBottomNavigation,
  Paper,
} from "@mui/material";

export function BottomNavigation(): ReactElement {
  const location = useLocation();

  // Strips away ie chat id, meaning `/chat/12` -> `/chat`
  let pathname = "/" + location.pathname.split("/")[1];

  if (pathname === "/") {
    pathname = "/blog";
  }

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
          value="/blog"
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
