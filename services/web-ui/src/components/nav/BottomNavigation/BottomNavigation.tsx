import { ReactElement } from "react";
import { Link as RouterLink, useLocation } from "react-router";

import { AppBar, Button, Toolbar } from "@mui/material";

import { mobileNav } from "../nav.items";
import { NavItem } from "../types";

interface BottomNavigationListItemProps {
  fractionalWidth: number;
  item: NavItem;
}

function BottomNavigationListItem({
  fractionalWidth,
  item,
}: BottomNavigationListItemProps): ReactElement {
  const location = useLocation();
  const isActive = item.checkIfActive(location.pathname);

  return (
    <Button
      component={RouterLink}
      to={item.url}
      sx={{ width: `${100 * fractionalWidth}%` }}
    >
      <item.Icon
        sx={{
          color: isActive ? "primary.main" : "action.active",
        }}
      />
    </Button>
  );
}

export function BottomNavigation(): ReactElement {
  const fractionalWidth = 1 / mobileNav.bottom.length;

  return (
    <AppBar
      color="inherit"
      component="nav"
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        left: 0,
        right: 0,

        // This looks better on mobile as there will be navigation buttons below
        boxShadow: "none",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        {mobileNav.bottom.map((item) => (
          <BottomNavigationListItem
            fractionalWidth={fractionalWidth}
            key={item.url}
            item={item}
          />
        ))}
      </Toolbar>
    </AppBar>
  );
}
