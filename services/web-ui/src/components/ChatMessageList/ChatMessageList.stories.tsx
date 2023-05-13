import type { Meta, StoryObj } from "@storybook/react";

import { createChatMessagesMock } from "src/test/mocks/chatMessage.mock";

import { ChatMessageList } from ".";

export default {
  title: "ChatMessageList",
  component: ChatMessageList,
} as Meta;

type Story = StoryObj<typeof ChatMessageList>;

export const Primary: Story = {
  args: {
    messages: createChatMessagesMock(10),
  },
};
