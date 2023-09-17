import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from ".";

export default {
  title: "Core/Dialog",
  component: Dialog,
} as Meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    children: <p>Lorem ipsum</p>,
  },
};
