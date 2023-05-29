import React from "react";

import { Typography } from "@mui/material";

export function JournalPageHeader(): React.ReactElement {
  return (
    <>
      <Typography variant="h5">Journal</Typography>
      <Typography color="textSecondary" gutterBottom>
        These are the actions that has been performed in the system by your
        account
      </Typography>
    </>
  );
}
