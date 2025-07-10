import { FC } from "react";
import { Link as ReactRouterLink } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  List,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  DRAWER_WIDTH,
  DesktopDrawer,
} from "src/components/ui/Drawer/DesktopDrawer";
import { useTranslation } from "src/core/i18n";
import { useMetaData } from "src/hooks/useMetaData";

import { useDesktopNavItems } from "../../hooks/useNavItems";
import { NavProps } from "../../types";
import { AppBar } from "../AppBar";
import { NavLinkListItem } from "./NavLinkListItem";
import { NavProfile } from "./NavProfile";

export const NavDesktop: FC<NavProps> = ({
  appBarContent,
  children,
  navBackTo,
  padding,
  title,
}) => {
  const { t } = useTranslation("core");

  const desktopNav = useDesktopNavItems();

  useMetaData({ title });

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
            padding: padding === "normal" ? 4 : undefined,
          }}
        >
          {navBackTo && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <IconButton
                component={ReactRouterLink}
                size="small"
                sx={{ border: "1px solid" }}
                to={navBackTo}
              >
                <ArrowBack />
              </IconButton>

              <Typography variant="body1">{t("general.back")}</Typography>
            </Box>
          )}

          {title && (
            <Typography color="textPrimary" sx={{ mb: 2 }} variant="h4">
              {title}
            </Typography>
          )}

          {children}
        </Container>

        <Toolbar />
      </Box>
    </Box>
  );
};
