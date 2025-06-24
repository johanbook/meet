import type { Meta, StoryObj } from "@storybook/react-vite";

import { DatePicker } from ".";

export default {
  title: "Core/DatePicker",
  component: DatePicker,
} as Meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    value: new Date(),
  },
};
