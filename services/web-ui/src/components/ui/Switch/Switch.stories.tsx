import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from ".";

export default {
  title: "Core/Switch",
  component: Switch,
} as Meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    onChange: () => alert("I was clicked"),
  },
};
