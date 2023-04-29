import React from "react";

import Typography from "@mui/material/Typography";

export interface ErrorMessageProps {
  debug?: string;
  message: string;
}

export default function ErrorMessage({
  debug,
  message,
}: ErrorMessageProps): React.ReactElement {
  return (
    <>
      <Typography color="error">{message}</Typography>

      {debug && <Typography color="textSecondary">{debug} </Typography>}
    </>
  );
}
