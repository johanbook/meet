import { FC } from "react";

import { Box, Container, List, Stack, Toolbar } from "@mui/material";

import {
  DRAWER_WIDTH,
  DesktopDrawer,
} from "src/components/ui/Drawer/DesktopDrawer";

import { useDesktopNavItems } from "../../hooks/useNavItems";
import { NavProps } from "../../types";
import { AppBar } from "../AppBar";
import { NavLinkListItem } from "./NavLinkListItem";
import { NavProfile } from "./NavProfile";

export const NavDesktop: FC<NavProps> = ({ appBarContent, children }) => {
  const desktopNav = useDesktopNavItems();

  return (
    <Box sx={{ height: "100vh", minHeight: "100%" }}>
      <DesktopDrawer>
        <Stack
          sx={{
            flexGrow: 1,
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <List dense sx={{ flexGrow: 1, m: 1 }}>
            {desktopNav.top.map((item) => (
              <NavLinkListItem item={item} key={item.url} />
            ))}
          </List>

          <List sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            {desktopNav.bottom.map((item) => (
              <NavProfile item={item} key={item.url} />
            ))}
          </List>
        </Stack>
      </DesktopDrawer>

      <AppBar appBarContent={appBarContent} />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: `${DRAWER_WIDTH}px`,
          height: "100%",
        }}
      >
        <Toolbar />

        <Container
          disableGutters
          maxWidth="md"
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Container>

        <Toolbar />
      </Box>
    </Box>
  );
};
