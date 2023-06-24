import React from "react";

import Typography from "@mui/material/Typography";

import { errorToMessage } from "src/utils/error.utils";

const DEFAULT_ERROR_MESSAGE = "An unexpected error occured";

export interface ErrorMessageProps {
  error?: unknown;
  message?: string;
}

export function ErrorMessage({
  error,
  message = DEFAULT_ERROR_MESSAGE,
}: ErrorMessageProps): React.ReactElement {
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    async function parseError() {
      const parsedErrorMessage = await errorToMessage(error);

      if (parsedErrorMessage) {
        setErrorMessage(parsedErrorMessage);
      }
    }

    parseError();
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, []);

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
