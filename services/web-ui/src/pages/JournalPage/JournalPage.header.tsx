import React from "react";

import { Typography } from "@mui/material";

export function JournalPageHeader(): React.ReactElement {
  return (
    <>
      <Typography sx={{ paddingTop: 2 }} variant="h5">
        Journal
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        These are the actions that has been performed in the system by your
        account
      </Typography>
    </>
  );
}
