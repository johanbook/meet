import React from "react";

import Typography from "@mui/material/Typography";

import { errorToMessage } from "src/utils/error.utils";

export interface ErrorMessageProps {
  error?: unknown;
  message: string;
}

export function ErrorMessage({
  error,
  message,
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
          <b>Reason:</b> {errorMessage}{" "}
        </Typography>
      )}
    </>
  );
}
