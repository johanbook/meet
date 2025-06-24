import type { Meta, StoryObj } from "@storybook/react-vite";

import { Carousel } from ".";

const IMAGES = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    src: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    src: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    src: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export default {
  title: "Core/Carousel",
  component: Carousel,
} as Meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    images: IMAGES,
  },
};

export const SingleImage: Story = {
  args: {
    images: IMAGES.slice(0, 1),
  },
};
