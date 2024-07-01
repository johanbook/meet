import React from "react";

import { List } from "@mui/material";

import { ChatConversationDetails } from "src/api";

import { ConnectionListItem } from "./components/ConnectionListItem";

export interface ConversationsPageComponentProps {
  data: ChatConversationDetails[];
}

export function ConversationsPageComponent({
  data,
}: ConversationsPageComponentProps): React.ReactElement {
  return (
    <>
      <List>
        {data.map((conversation, index) => (
          <ConnectionListItem
            divider={index < data.length - 1}
            key={conversation.id}
            data={conversation}
          />
        ))}
      </List>
    </>
  );
}
