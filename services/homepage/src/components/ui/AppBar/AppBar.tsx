import React from "react";

import {
  Box,
  Button,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";

import { CONFIG } from "src/config";

export function AppBar(): React.ReactElement {
  return (
    <MuiAppBar
      color="inherit"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "left" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="primary" variant="h6">
            {CONFIG.APP.NAME}
          </Typography>
        </Box>

        <Button component="a" href={CONFIG.URLS.APP} variant="contained">
          Log in
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}
