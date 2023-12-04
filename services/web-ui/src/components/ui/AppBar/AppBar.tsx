import React from "react";

import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";

import { organizationsApi } from "src/apis";
import { config } from "src/config";
import { CacheKeysConstants, useQuery } from "src/core/query";

export function AppBar(): React.ReactElement {
  const { data } = useQuery({
    queryKey: [CacheKeysConstants.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  return (
    <MuiAppBar
      color="inherit"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Typography color="primary" variant="h6">
          {config.APP.NAME} {data?.name}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
