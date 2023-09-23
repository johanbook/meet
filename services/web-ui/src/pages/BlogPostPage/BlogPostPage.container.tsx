import React from "react";

import { Box,Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useTranslation } from "src/core/i18n";
import { InteractionObserver } from "src/core/infinite-scroll";
import { CacheKeysConstants, useInfiniteQuery } from "src/core/query";

import { BlogPostPageComponent } from "./BlogPostPage.component";
import { BlogPostPageHeader } from "./BlogPostPage.header";
import { BlogPostPageSkeleton } from "./BlogPostPage.skeleton";
import { BlogPostForm } from "./components/BlogPostForm";

const ITEMS_PER_PAGE = 10;

export function BlogPostPageContainer(): React.ReactElement {
  const { t } = useTranslation("blog");

  const { error, data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      [CacheKeysConstants.BlogPosts],
      ({ pageParam = 0 }) =>
        blogsApi.getBlogPosts({
          skip: pageParam * ITEMS_PER_PAGE,
          top: (pageParam + 1) * ITEMS_PER_PAGE,
        }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.length < ITEMS_PER_PAGE) {
            return;
          }

          return pages.length;
        },
      }
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

  if (!data || data.pages.length === 0) {
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

      <BlogPostPageComponent data={data.pages} />

      {hasNextPage && <InteractionObserver onObserve={fetchNextPage} />}
    </>
  );
}
