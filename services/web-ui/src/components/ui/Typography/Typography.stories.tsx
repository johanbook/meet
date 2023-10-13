import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from ".";

export default {
  title: "Core/Typography",
  component: Typography,
} as Meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: "Lorem ipsum",
  },
};
