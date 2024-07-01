import type { Meta } from "@storybook/react";

import { ConnectionDetails } from "src/api";

import { ConversationsPageComponent } from "./ConversationsPage.component";

const MATCHES_DATA: ConnectionDetails[] = [
  {
    name: "John",
    profileId: 1,
    lastMessage: "hi",
  },

  {
    name: "Eric",
    profileId: 2,
    lastMessage: "hi",
  },

  {
    name: "Dalene",
    profileId: 3,
    lastMessage: "hi",
  },
];

export default {
  title: "Pages/Conversations/Views",
} as Meta;

export const Default = {
  render: () => <ConversationsPageComponent data={MATCHES_DATA} />,
};
