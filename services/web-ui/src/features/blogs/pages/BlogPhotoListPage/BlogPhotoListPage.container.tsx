import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { Box, Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { InteractionObserver } from "src/core/infinite-scroll";
import { CacheKeysConstants, useInfiniteQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { BlogPhotoListPageComponent } from "./BlogPhotoListPage.component";
import { BlogPhotoListPageNav } from "./BlogPhotoListPage.nav";
import { BlogPhotoListPageSkeleton } from "./BlogPhotoListPage.skeleton";

const ITEMS_PER_PAGE = 10;

export function BlogPhotoListPageContainer(): ReactElement {
  const { t } = useTranslation("blog-photos");

  const { error, data, isPending, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [CacheKeysConstants.BlogPhotoList],
      queryFn: ({ pageParam = 0 }) =>
        blogsApi.getBlogPhotoList({
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
      <BlogPhotoListPageNav>
        <ErrorView message={t("error")} />
      </BlogPhotoListPageNav>
    );
  }

  if (isPending) {
    return (
      <BlogPhotoListPageNav>
        <BlogPhotoListPageSkeleton />
      </BlogPhotoListPageNav>
    );
  }

  if (!data || data.pages[0].length === 0) {
    return (
      <BlogPhotoListPageNav>
        <Box sx={{ p: 2 }}>
          <Typography>{t("no-photos")}</Typography>
        </Box>
      </BlogPhotoListPageNav>
    );
  }

  return (
    <BlogPhotoListPageNav>
      <BlogPhotoListPageComponent data={data.pages} />
      {hasNextPage && <InteractionObserver onObserve={fetchNextPage} />}
    </BlogPhotoListPageNav>
  );
}
