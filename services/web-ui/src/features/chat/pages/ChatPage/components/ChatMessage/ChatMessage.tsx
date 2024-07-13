import React from "react";

import { Box, Typography, useTheme } from "@mui/material";

import { ChatMessageDetails } from "src/api";

export interface ChatMessageProps {
  message: ChatMessageDetails;
}

export function ChatMessage({ message }: ChatMessageProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Box
      component="li"
      sx={{
        py: 1,
        display: "flex",
        justifyContent: message.sentByCurrentUser ? "right" : "left",
      }}
    >
      <Typography
        component="span"
        sx={{
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider} `,
          borderRadius: 3,
          maxWidth: "80%",
          overflowWrap: "anywhere",
          p: 1,
        }}
      >
        {message.message}
      </Typography>
    </Box>
  );
}
