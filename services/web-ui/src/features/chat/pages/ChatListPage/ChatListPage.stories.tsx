import type { Meta } from "@storybook/react";

import { ChatConversationDetails } from "src/api";

import { ChatListPageComponent } from "./ChatListPage.component";

const MATCHES_DATA: ChatConversationDetails[] = [
  {
    createdAt: new Date(),
    id: "1",
    name: "John",
    lastMessage: "hi",
    profiles: [],
  },
  {
    createdAt: new Date(),
    id: "2",
    name: "Eric",
    lastMessage: "hi",
    profiles: [],
  },
  {
    createdAt: new Date(),
    id: "3",
    name: "Dalene",
    lastMessage: "hi",
    profiles: [],
  },
];

export default {
  title: "Pages/Chats/Views",
} as Meta;

export const Default = {
  render: () => <ChatListPageComponent data={MATCHES_DATA} />,
};
