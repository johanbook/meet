import React from "react";

import { Typography } from "@mui/material";

export function NoProfilesFound(): React.ReactElement {
  return (
    <>
      <Typography gutterBottom variant="h5">
        No profiles found
      </Typography>

      <Typography>
        Try again later or expand your search range
      </Typography>
    </>
  );
}
