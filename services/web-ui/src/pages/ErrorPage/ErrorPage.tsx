import React from "react";

import { Box } from "@mui/material";

import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { ErrorMessageProps } from "src/components/ui/ErrorMessage/ErrorMessage";

export interface ErrorPageProps extends ErrorMessageProps {}

export function ErrorPage(props: ErrorPageProps): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box>
        <ErrorMessage {...props} />
      </Box>
    </Box>
  );
}
