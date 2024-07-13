import type { Meta } from "@storybook/react";

import { ChatConversationDetails } from "src/api";

import { ChatListPageComponent } from "./ChatListPage.component";

const MATCHES_DATA: ChatConversationDetails[] = [
  {
    id: "1",
    name: "John",
    lastMessage: "hi",
  },

  {
    id: "2",
    name: "Eric",
    lastMessage: "hi",
  },

  {
    id: "3",
    name: "Dalene",
    lastMessage: "hi",
  },
];

export default {
  title: "Pages/Chats/Views",
} as Meta;

export const Default = {
  render: () => <ChatListPageComponent data={MATCHES_DATA} />,
};
