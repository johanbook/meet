import React from "react";

import { Box, Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { BlogPostPageComponent } from "./BlogPostPage.component";
import { BlogPostPageHeader } from "./BlogPostPage.header";
import { BlogPostPageSkeleton } from "./BlogPostPage.skeleton";
import { BlogPostForm } from "./components/BlogPostForm";

export function BlogPostPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery(
    CacheKeysConstants.BlogPosts,
    () => blogsApi.getBlogPosts()
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

        <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
          <BlogPostForm />
        </Box>

        <Typography>No blog posts found</Typography>
      </>
    );
  }

  return (
    <>
      <BlogPostPageHeader />

      <BlogPostPageComponent data={data} />
    </>
  );
}
