import React from "react";

import {
  Box,
  Button,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";

import { CONFIG } from "src/config";
import { useTranslation } from "src/core/i18n";

export function AppBar(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <MuiAppBar
      color="transparent"
      position="fixed"
      sx={{ border: "none", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      variant="outlined"
    >
      <Toolbar sx={{ display: "flex", justifyContent: "left" }}>
        <Typography
          color="primary"
          component="a"
          href="/"
          sx={(theme) => ({
            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 600,
            fontFamily: "sans-serif",
            textDecoration: "none",
            textShadow: `1px 1px 1px white`,
          })}
          variant="h5"
        >
          {CONFIG.APP.NAME}
        </Typography>

        <Box sx={{ flexGrow: 1 }}></Box>

        <Button
          component="a"
          color="primary"
          href={CONFIG.URLS.APP}
          sx={{ borderColor: "white", color: "white" }}
          variant="outlined"
        >
          {t("nav.login")}
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}
