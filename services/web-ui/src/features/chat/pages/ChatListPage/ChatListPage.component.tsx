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
      {data.map((conversation) => (
        <ConversationListItem key={conversation.id} data={conversation} />
      ))}
    </List>
  );
}
