import { ReactElement } from "react";

import { List } from "@mui/material";

import { ChatConversationDetails } from "src/api";

import { ConversationListItem } from "./components/ConversationListItem";

export interface ChatListPageComponentProps {
  data: ChatConversationDetails[];
}

export function ChatListPageComponent({
  data,
}: ChatListPageComponentProps): ReactElement {
  return (
    <List>
      {data.map((conversation, index) => (
        <ConversationListItem
          divider={index < data.length - 1}
          key={conversation.id}
          data={conversation}
        />
      ))}
    </List>
  );
}
