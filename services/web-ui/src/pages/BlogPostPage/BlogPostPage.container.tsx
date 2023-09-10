import React from "react";

import { Box, Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { BlogPostPageComponent } from "./BlogPostPage.component";
import { BlogPostPageHeader } from "./BlogPostPage.header";
import { BlogPostPageSkeleton } from "./BlogPostPage.skeleton";
import { BlogPostForm } from "./components/BlogPostForm";

export function BlogPostPageContainer(): React.ReactElement {
  const { t } = useTranslation("blog");

  const { error, data, isLoading } = useQuery(
    CacheKeysConstants.BlogPosts,
    () => blogsApi.getBlogPosts()
  );

  if (error) {
    return (
      <>
        <BlogPostPageHeader />
        <ErrorMessage error={error} />
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

        <Typography>{t("no-posts")}</Typography>
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
