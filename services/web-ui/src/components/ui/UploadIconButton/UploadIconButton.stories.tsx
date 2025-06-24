import { Upload } from "@mui/icons-material";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { UploadIconButton } from ".";

export default {
  title: "Core/UploadIconButton",
  component: UploadIconButton,
} as Meta;

type Story = StoryObj<typeof UploadIconButton>;

export const Default: Story = {
  args: {
    children: <Upload />,
    onChange: (files) => alert(`Uploaded ${files.length} file(s)`),
  },
};

export const Multiple: Story = {
  args: {
    children: <Upload />,
    multiple: true,
    onChange: (files) => alert(`Uploaded ${files.length} file(s)`),
  },
};
