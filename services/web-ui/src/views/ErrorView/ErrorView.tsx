import { ReactElement } from "react";

import { Box } from "@mui/material";

import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { ErrorMessageProps } from "src/components/ui/ErrorMessage/ErrorMessage";

export interface ErrorViewProps extends ErrorMessageProps {}

export function ErrorView(props: ErrorViewProps): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10px",
      }}
    >
      <Box>
        <ErrorMessage {...props} />
      </Box>
    </Box>
  );
}
