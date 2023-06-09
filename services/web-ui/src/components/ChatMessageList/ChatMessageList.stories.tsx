import type { Meta, StoryObj } from "@storybook/react";

import { createChatMessagesMock } from "src/test/mocks/chatMessage.mock";

import { ChatMessageList } from ".";

export default {
  title: "Components/ChatMessageList",
  component: ChatMessageList,
} as Meta;

type Story = StoryObj<typeof ChatMessageList>;

export const Default: Story = {
  args: {
    messages: createChatMessagesMock(10),
  },
};
