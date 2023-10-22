import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { Box, Container, List, Toolbar } from "@mui/material";

import { AppBar } from "src/components/ui/AppBar";
import { BottomNavigation } from "src/components/ui/BottomNavigation";
import { Drawer } from "src/components/ui/Drawer";
import { useIsMobile } from "src/hooks/useIsMobile";

import { NavLinkListItem } from "./NavLinkListItem";
import { desktopNavItems } from "./desktopItems";

export interface NavProps {}

export function Nav(): ReactElement {
  const isMobile = useIsMobile();

  return (
    <Box sx={{ height: "100vh", minHeight: "100%" }}>
      <Drawer>
        <List>
          {desktopNavItems.map((item) => (
            <NavLinkListItem item={item} key={item.url} />
          ))}
        </List>
      </Drawer>

      <AppBar />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 3,
          paddingRight: 3,
          paddingTop: 1,
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
          <Outlet />
        </Container>

        <Toolbar />
      </Box>

      {isMobile && <BottomNavigation />}
    </Box>
  );
}
