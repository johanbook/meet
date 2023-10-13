import type { Meta, StoryObj } from "@storybook/react";

import { VerticalCenter } from ".";

export default {
  title: "Core/VerticalCenter",
  component: VerticalCenter,
} as Meta;

type Story = StoryObj<typeof VerticalCenter>;

export const Default: Story = {
  args: {
    children: <p>Lorem ipsum</p>,
  },
};
