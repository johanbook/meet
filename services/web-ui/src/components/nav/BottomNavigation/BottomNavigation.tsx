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
  const regexp = new RegExp(item.isActive || item.url);
  const match = regexp.test(location.pathname);

  return (
    <Button
      component={RouterLink}
      to={item.url}
      sx={{ width: `${100 * fractionalWidth}%` }}
    >
      <item.Icon
        sx={{
          color: match ? "primary.main" : "action.active",
        }}
      />
    </Button>
  );
}

export function BottomNavigation(): ReactElement {
  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0, left: 0, right: 0 }}>
      <Toolbar>
        {mobileNav.bottom.map((item) => (
          <BottomNavigationListItem
            fractionalWidth={1 / mobileNav.bottom.length}
            key={item.url}
            item={item}
          />
        ))}
      </Toolbar>
    </AppBar>
  );
}
