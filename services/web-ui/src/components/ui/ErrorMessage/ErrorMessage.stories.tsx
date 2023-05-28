import type { Meta, StoryObj } from "@storybook/react";

import { ErrorMessage } from ".";

export default {
  title: "Core/ErrorMessage",
  component: ErrorMessage,
} as Meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    message: "Lorem ipsum",
  },
};
