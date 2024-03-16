import { SyntheticEvent } from "react";

import { ListItemText, MenuItem } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { Menu } from ".";

export default {
  title: "Core/Menu",
  component: Menu,
} as Meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    Button: ({ onClick }: { onClick: (event: SyntheticEvent) => void }) => (
      <button onClick={onClick}>Click me</button>
    ),
    children: (
      <MenuItem>
        <ListItemText>Lorem ipsum</ListItemText>
      </MenuItem>
    ),
  },
};
