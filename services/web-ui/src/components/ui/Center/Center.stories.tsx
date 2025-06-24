import type { Meta, StoryObj } from "@storybook/react-vite";

import { Center } from ".";

export default {
  title: "Core/Center",
  component: Center,
} as Meta;

type Story = StoryObj<typeof Center>;

export const Default: Story = {
  args: {
    children: <p>Lorem ipsum</p>,
  },
};
