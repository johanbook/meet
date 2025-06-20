import type { Meta, StoryObj } from "@storybook/react";

import { NotFoundView } from ".";

export default {
  title: "Views/Not found",
  component: NotFoundView,
} as Meta;

type Story = StoryObj<typeof NotFoundView>;

export const Default: Story = {
  args: {},
};
