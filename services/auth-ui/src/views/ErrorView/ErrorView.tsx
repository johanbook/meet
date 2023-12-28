import { ReactElement } from "react";

import { Box, Typography } from "@mui/material";

interface ErrorViewProps {
  message: string;
}

export function ErrorView({ message }: ErrorViewProps): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography color="error">{message}</Typography>
    </Box>
  );
}
