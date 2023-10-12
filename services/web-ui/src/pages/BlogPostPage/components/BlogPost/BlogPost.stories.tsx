import type { Meta, StoryObj } from "@storybook/react";

import { BlogPostCommentDetails, BlogPostDetails } from "src/api";

import { BlogPost } from ".";

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
