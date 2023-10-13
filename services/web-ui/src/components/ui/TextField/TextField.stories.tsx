import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from ".";

export default {
  title: "Core/TextField",
  component: TextField,
} as Meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: "My TextField",
    placeholder: "Text",
  },
};
