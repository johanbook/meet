import React from "react";

import { ListItem, ListItemText, useTheme } from "@mui/material";

import { ChatMessageDetails } from "src/api";

export interface ChatMessageProps {
  message: ChatMessageDetails;
}

export function ChatMessage({ message }: ChatMessageProps): React.ReactElement {
  const theme = useTheme();

  return (
    <ListItem>
      <ListItemText
        primary={message.message}
        primaryTypographyProps={{
          align: message.sentByCurrentUser ? "right" : "left",
        }}
        sx={{
          background: message.sentByCurrentUser
            ? theme.palette.background.paper
            : theme.palette.grey[50],
          border: `1px solid ${theme.palette.divider} `,
          borderRadius: 3,
          padding: 1,
        }}
      />
    </ListItem>
  );
}
