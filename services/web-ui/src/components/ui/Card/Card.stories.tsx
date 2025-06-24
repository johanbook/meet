import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from ".";

export default {
  title: "Core/Card",
  component: Card,
} as Meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <p>Lorem ipsum</p>,
  },
};
