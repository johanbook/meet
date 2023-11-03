import { ReactElement } from "react";

import { Box, Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useTranslation } from "src/core/i18n";
import { InteractionObserver } from "src/core/infinite-scroll";
import {
  NotificationEventsConstants,
  useHandleNotification,
} from "src/core/notifications";
import { CacheKeysConstants, useInfiniteQuery } from "src/core/query";

import { BlogPostPageComponent } from "./BlogPostListPage.component";
import { BlogPostListPageHeader } from "./BlogPostListPage.header";
import { BlogPostListPageSkeleton } from "./BlogPostListPage.skeleton";
import { BlogPostForm } from "./components/BlogPostForm";

const ITEMS_PER_PAGE = 10;

export function BlogPostListPageContainer(): ReactElement {
  const { t } = useTranslation("blog");

  const { error, data, isLoading, fetchNextPage, hasNextPage, refetch } =
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

  useHandleNotification({
    onNotification: () => refetch(),
    type: NotificationEventsConstants.NEW_BLOG_POST,
  });

  if (error) {
    return (
      <>
        <BlogPostListPageHeader />
        <ErrorMessage error={error} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <BlogPostListPageHeader />
        <BlogPostListPageSkeleton />
      </>
    );
  }

  if (!data || data.pages[0].length === 0) {
    return (
      <>
        <BlogPostListPageHeader />

        <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
          <BlogPostForm />
        </Box>

        <Typography>{t("no-posts")}</Typography>
      </>
    );
  }

  return (
    <>
      <BlogPostListPageHeader />

      <BlogPostPageComponent data={data.pages} />

      {hasNextPage && <InteractionObserver onObserve={fetchNextPage} />}
    </>
  );
}
