import React from "react";

import { Box, CircularProgress } from "@mui/material";

export function ProfileGuardSkeleton(): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
