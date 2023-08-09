import React from "react";
import { useQuery } from "react-query";

import { List, ListItem, ListItemText, Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";

import { BlogPostPageHeader } from "./BlogPostPage.header";
import { BlogPostPageSkeleton } from "./BlogPostPage.skeleton";

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
      </>
    );
  }

  return (
    <>
      <BlogPostPageHeader />

      <List>
        {data.map((post) => (
          <ListItem key={post.content}>
            <ListItemText primary={post.content} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
