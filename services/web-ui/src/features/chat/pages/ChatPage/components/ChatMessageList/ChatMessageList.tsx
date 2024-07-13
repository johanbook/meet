import React from "react";

import { List } from "@mui/material";

import { ChatMessageDetails } from "src/api";

import { ChatMessage } from "../ChatMessage/ChatMessage";

interface ChatMessageListProps {
  messages: ChatMessageDetails[];
}

export function ChatMessageList({
  messages,
}: ChatMessageListProps): React.ReactElement {
  // The Flex layout used to keep focus at bottom of container
  // shows messages in reverse order
  const shownMessages = [...messages].reverse();

  return (
    <List
      sx={{
        maxHeight: "80vh",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {shownMessages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </List>
  );
}
