import type { Meta, StoryObj } from "@storybook/react";

import { ErrorView } from ".";

export default {
  title: "Views/ErrorView",
  component: ErrorView,
} as Meta;

type Story = StoryObj<typeof ErrorView>;

export const Default: Story = {
  args: {},
};
