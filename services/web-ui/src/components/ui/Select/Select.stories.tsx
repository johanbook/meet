import { MenuItem } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from ".";

export default {
  title: "Core/Select",
  component: Select,
} as Meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    children: [
      <MenuItem key="option1" value="option1">
        Option 1
      </MenuItem>,
      <MenuItem key="option2" value="option2">
        Option 2
      </MenuItem>,
      <MenuItem key="option3" value="option3">
        Option 3
      </MenuItem>,
    ],
    fullWidth: true,
    label: "My Select",
    onChange: () => {},
    value: "Option 1",
  },
};
