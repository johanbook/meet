import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollapsibleCard } from ".";

export default {
  title: "Core/CollapsibleCard",
  component: CollapsibleCard,
} as Meta;

type Story = StoryObj<typeof CollapsibleCard>;

export const Default: Story = {
  args: {
    children: <p>Lorem ipsum</p>,
    title: "Lorem ipsum",
  },
};
