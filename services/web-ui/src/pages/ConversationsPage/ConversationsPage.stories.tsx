import type { Meta } from "@storybook/react";

import { ChatConversationDetails } from "src/api";

import { ConversationsPageComponent } from "./ConversationsPage.component";

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
  title: "Pages/Conversations/Views",
} as Meta;

export const Default = {
  render: () => <ConversationsPageComponent data={MATCHES_DATA} />,
};
