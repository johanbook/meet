import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { InteractionObserver } from "src/core/infinite-scroll";
import { CacheKeyEnum, useInfiniteQuery } from "src/core/query";
import { useMetaData } from "src/hooks/useMetaData";
import { ErrorView } from "src/views/ErrorView";

import { BlogPostPageComponent } from "./BlogPostListPage.component";
import { BlogPostListPageNav } from "./BlogPostListPage.nav";
import { BlogPostListPageSkeleton } from "./BlogPostListPage.skeleton";

const ITEMS_PER_PAGE = 10;

export function BlogPostListPageContainer(): ReactElement {
  useMetaData({ title: "" });

  const { t } = useTranslation("blog");

  const { error, data, isPending, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [CacheKeyEnum.BlogPosts],
      queryFn: ({ pageParam = 0 }) =>
        blogsApi.getBlogPosts({
          skip: pageParam * ITEMS_PER_PAGE,
          top: (pageParam + 1) * ITEMS_PER_PAGE,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < ITEMS_PER_PAGE) {
          return;
        }

        return pages.length;
      },
    });

  if (error) {
    return (
      <BlogPostListPageNav>
        <ErrorView message={t("error")} />
      </BlogPostListPageNav>
    );
  }

  if (isPending) {
    return (
      <BlogPostListPageNav>
        <BlogPostListPageSkeleton />
      </BlogPostListPageNav>
    );
  }

  if (!data || data.pages[0].length === 0) {
    return (
      <BlogPostListPageNav>
        <Typography sx={{ p: 2 }}>{t("no-posts")}</Typography>
      </BlogPostListPageNav>
    );
  }

  return (
    <BlogPostListPageNav>
      <BlogPostPageComponent data={data.pages} />
      {hasNextPage && <InteractionObserver onObserve={fetchNextPage} />}
    </BlogPostListPageNav>
  );
}
