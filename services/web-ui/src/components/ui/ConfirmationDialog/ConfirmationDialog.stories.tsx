import type { Meta, StoryObj } from "@storybook/react";

import { ConfirmationDialog } from ".";

export default {
  title: "Core/ConfirmationDialog",
  component: ConfirmationDialog,
} as Meta;

type Story = StoryObj<typeof ConfirmationDialog>;

export const Default: Story = {
  args: {
    description: "This will show an alert message",
    onConfirm: () => alert("Hi"),
    title: "Confirm showing alert",
  },
};
