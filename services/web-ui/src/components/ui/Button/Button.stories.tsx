import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

export default {
  title: "Core/Button",
  component: Button,
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
    onClick: () => alert("I was clicked"),
  },
};

