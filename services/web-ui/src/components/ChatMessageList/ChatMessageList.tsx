import React from "react";

import { List } from "@mui/material";

import { ChatMessageDetails } from "src/api";

import { ChatMessage } from "../ChatMessage/ChatMessage";

export interface ChatMessageListProps {
  messages: ChatMessageDetails[];
}

export function ChatMessageList({
  messages,
}: ChatMessageListProps): React.ReactElement {
  return (
    <List
      sx={{
        maxHeight: "80vh",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </List>
  );
}
