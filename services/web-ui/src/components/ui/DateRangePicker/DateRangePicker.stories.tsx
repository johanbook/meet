import type { Meta, StoryObj } from "@storybook/react-vite";

import { DateRangePicker } from ".";

export default {
  title: "Core/DateRangePicker",
  component: DateRangePicker,
} as Meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    value: { from: new Date(), to: new Date() },
  },
};
