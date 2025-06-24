import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChatTextFieldComponent } from "./ChatTextField.component";

export default {
  title: "Pages/Chat messages/ChatTextField",
  component: ChatTextFieldComponent,
} as Meta;

type Story = StoryObj<typeof ChatTextFieldComponent>;

export const Default: Story = {
  args: {
    onSubmit: () => alert("Submit"),
  },
};
