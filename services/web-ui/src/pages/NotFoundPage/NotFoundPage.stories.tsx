import type { Meta, StoryObj } from "@storybook/react";

import { NotFoundPage } from ".";

export default {
  title: "Pages/Not found",
  component: NotFoundPage,
} as Meta;

type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {
  args: {},
};
