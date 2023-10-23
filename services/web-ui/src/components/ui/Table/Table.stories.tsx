import type { Meta, StoryObj } from "@storybook/react";

import { Table } from ".";

export default {
  title: "Core/Table",
  component: Table,
} as Meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [{ field: "name", headerName: "Name" }],
    rows: [{ id: 1, name: "Erik" }],
  },
};
