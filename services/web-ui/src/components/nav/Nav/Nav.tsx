import { ReactElement, ReactNode } from "react";

import { Box, Container, List, Stack, Toolbar } from "@mui/material";

import { AppBar } from "src/components/nav/AppBar";
import {
  DRAWER_WIDTH,
  DesktopDrawer,
} from "src/components/ui/Drawer/DesktopDrawer";
import { useIsMobile } from "src/hooks/useIsMobile";

import { BottomNavigation } from "../BottomNavigation";
import { NavLinkListItem } from "../NavLinkListItem";
import { desktopNav } from "../nav.items";

interface NavProps {
  appBarContent?: ReactNode;
  children: ReactNode;
}

export function Nav({ appBarContent, children }: NavProps): ReactElement {
  const isMobile = useIsMobile();

  return (
    <Box sx={{ height: "100vh", minHeight: "100%" }}>
      {!isMobile && (
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
                <NavLinkListItem
                  disableBottomPadding
                  item={item}
                  key={item.url}
                />
              ))}
            </List>
          </Stack>
        </DesktopDrawer>
      )}

      <AppBar appBarContent={appBarContent} />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: isMobile ? undefined : `${DRAWER_WIDTH}px`,
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

      {isMobile && <BottomNavigation />}
    </Box>
  );
}
