import React from "react";

import { ListItem, ListItemText } from "@mui/material";

import { ChatMessageDetails } from "src/api";

export interface ChatMessageProps {
  message: ChatMessageDetails;
}

export function ChatMessage({ message }: ChatMessageProps): React.ReactElement {
  return (
    <ListItem>
      <ListItemText
        primary={message.message}
        primaryTypographyProps={{
          align: message.sentByCurrentUser ? "right" : "left",
        }}
        sx={{
          background: "rgb(250,250,250)",
          border: "1px solid rgb(200,200,200)",
          borderRadius: 4,
          padding: 1,
        }}
      />
    </ListItem>
  );
}
