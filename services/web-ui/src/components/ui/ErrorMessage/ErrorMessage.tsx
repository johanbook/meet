import React from "react";

import Typography from "@mui/material/Typography";

import { errorToMessage } from "src/utils/error";

const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred";

export interface ErrorMessageProps {
  error?: unknown;
  message?: string;
}

export function ErrorMessage({
  error,
  message = DEFAULT_ERROR_MESSAGE,
}: ErrorMessageProps): React.ReactElement {
  const errorMessage = errorToMessage(error);

  return (
    <>
      <Typography color="error" variant="h6">
        {message}
      </Typography>

      {errorMessage && (
        <Typography color="textSecondary">
          <b>Reason:</b> {errorMessage}
        </Typography>
      )}

      <Typography color="textSecondary">
        You can try refreshing the page. If the error persists, please contact
        our support.
      </Typography>
    </>
  );
}
