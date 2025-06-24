import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from ".";

export default {
  title: "Core/Button",
  component: Button,
} as Meta;

type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    children: "Click me",
    onClick: () => alert("I was clicked"),
    variant: "contained",
  },
};

export const ContainedLoading: Story = {
  args: {
    children: "Click me",
    loading: true,
    onClick: () => alert("I was clicked"),
    variant: "contained",
  },
};

export const Outlined: Story = {
  args: {
    children: "Click me",
    onClick: () => alert("I was clicked"),
    variant: "outlined",
  },
};

export const Text: Story = {
  args: {
    children: "Click me",
    onClick: () => alert("I was clicked"),
    variant: "text",
  },
};
