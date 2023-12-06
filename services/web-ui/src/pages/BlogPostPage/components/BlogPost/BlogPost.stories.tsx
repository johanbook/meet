import type { Meta, StoryObj } from "@storybook/react";

import {
  BlogPostCommentDetails,
  BlogPostDetails,
  BlogPostPhotoDetails,
} from "src/api";

import { BlogPost } from ".";

const IMAGES: BlogPostPhotoDetails[] = [
  {
    description: "San Francisco – Oakland Bay Bridge, United States",
    id: "1",
    url: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    description: "Bird",
    id: "2",
    url: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    description: "Bali, Indonesia",
    id: "3",
    url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    description: "Goč, Serbia",
    id: "4",
    url: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export default {
  title: "Pages/Blog posts/BlogPost",
  component: BlogPost,
} as Meta;

type Story = StoryObj<typeof BlogPost>;

const BLOG_POST: BlogPostDetails = {
  comments: [],
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing",
  createdAt: "2020",
  id: "my-id",
  ownedByCurrentUser: false,
  photos: [],
  profile: {
    id: 1,
    name: "John Doe",
  },
  reactions: {
    count: 0,
    currentProfileReactionId: undefined,
  },
};

const COMMENT: BlogPostCommentDetails = {
  id: "my-comment-id",
  content: "Lorem ipsum dolor sit amet",
  createdAt: "2020",
  profile: {
    id: 2,
    name: "John Doe",
  },
};

export const Default: Story = {
  args: {
    post: BLOG_POST,
  },
};

export const LongComment: Story = {
  args: {
    post: {
      ...BLOG_POST,
      comments: [
        {
          ...COMMENT,
          content:
            "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
        },
      ],
    },
  },
};

export const MultipleImage: Story = {
  args: {
    post: {
      ...BLOG_POST,
      photos: IMAGES,
    },
  },
};

export const SingleImage: Story = {
  args: {
    post: {
      ...BLOG_POST,
      photos: [IMAGES[0]],
    },
  },
};
