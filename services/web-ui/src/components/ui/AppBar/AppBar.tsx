import React from "react";

import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";

import { config } from "src/config";

export function AppBar(): React.ReactElement {
  return (
    <MuiAppBar
      color="inherit"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Typography color="primary" variant="h6">
          {config.APP.NAME}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
