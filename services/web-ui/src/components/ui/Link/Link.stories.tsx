import type { Meta, StoryObj } from "@storybook/react-vite";

import { Link } from ".";

export default {
  title: "Core/Link",
  component: Link,
} as Meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Lorem ipsum",
    to: "/",
  },
};
