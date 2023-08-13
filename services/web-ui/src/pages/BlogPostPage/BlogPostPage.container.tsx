import React from "react";
import { useQuery } from "react-query";

import { Avatar, Box, Card, Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { timeSince } from "src/utils/time";

import { BlogPostPageHeader } from "./BlogPostPage.header";
import { BlogPostPageSkeleton } from "./BlogPostPage.skeleton";
import { BlogPostForm } from "./components/BlogPostForm";

export function BlogPostPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("blog-posts", () =>
    blogsApi.getBlogPosts()
  );

  if (error) {
    const message = (error as Error).message;
    return (
      <>
        <BlogPostPageHeader />
        <ErrorMessage message={message} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <BlogPostPageHeader />
        <BlogPostPageSkeleton />
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <BlogPostPageHeader />
        <Typography>No blog posts found</Typography>

        <BlogPostForm />
      </>
    );
  }

  return (
    <>
      <BlogPostPageHeader />

      {data.map((post) => (
        <Card
          key={post.id}
          sx={{ marginBottom: 2, padding: 2 }}
          variant="outlined"
        >
          <Box sx={{ alignItems: "center", display: "flex", paddingBottom: 2 }}>
            <Avatar />

            <Box sx={{ paddingLeft: 1 }}>
              <Typography>
                <b>{post.profile.name}</b> published
              </Typography>
              <Typography variant="subtitle2">
                {timeSince(post.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Typography>{post.content}</Typography>
        </Card>
      ))}

      <BlogPostForm />
    </>
  );
}
