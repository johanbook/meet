import type { Meta, StoryObj } from "@storybook/react-vite";

import { ErrorView } from ".";

export default {
  title: "Views/ErrorView",
  component: ErrorView,
} as Meta;

type Story = StoryObj<typeof ErrorView>;

export const Default: Story = {
  args: {},
};
