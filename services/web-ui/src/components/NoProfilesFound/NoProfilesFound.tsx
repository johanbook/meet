import React from "react";

import { Typography } from "@mui/material";

export function NoProfilesFound(): React.ReactElement {
  return (
    <>
      <Typography>
        No profiles found. Try again later or try expanding your search range.
      </Typography>
    </>
  );
}
