import { ReactElement } from "react";

import { HeartBroken } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface ErrorViewProps {
  description?: string;
  message?: string | null;
}

export function ErrorView({
  description,
  message = "An unexpected error occurred",
}: ErrorViewProps): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <HeartBroken color="error" sx={{ fontSize: 60, mb: 2 }} />

        <Typography align="center" gutterBottom variant="h5">
          {message}
        </Typography>

        <Typography align="center" color="textSecondary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
