import React from "react";

import Typography from "@mui/material/Typography";

export interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({
  message,
}: ErrorMessageProps): React.ReactElement {
  return (
    <>
      <Typography color="error">{message}</Typography>
    </>
  );
}
