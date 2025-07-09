import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  BottomNavigationAction,
  Box,
  BottomNavigation as MuiBottomNavigation,
} from "@mui/material";

import { useMobileNavItems } from "../../hooks/useNavItems";

export function BottomNavigation(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const mobileNav = useMobileNavItems();

  const activeItem = mobileNav.bottom.find((item) =>
    item.checkIfActive(location.pathname),
  );

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: "auto",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <MuiBottomNavigation
        onChange={(_, path) => navigate(path)}
        value={activeItem?.url}
      >
        {mobileNav.bottom.map((item) => (
          <BottomNavigationAction
            key={item.url}
            icon={<item.Icon />}
            value={item.url}
          />
        ))}
      </MuiBottomNavigation>
    </Box>
  );
}
