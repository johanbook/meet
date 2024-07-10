import { ReactElement } from "react";
import { useParams } from "react-router";

import { Typography } from "@mui/material";

import { blogsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { BlogPostPageNav } from "./BlogPostPage.nav";
import { BlogPostPageSkeleton } from "./BlogPostPage.skeleton";
import { BlogPost } from "./components/BlogPost";

export function BlogPostPageContainer(): ReactElement {
  const { t } = useTranslation("blog");
  const { id = "" } = useParams();

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeysConstants.BlogPosts, id],
    queryFn: () => blogsApi.getBlogPost({ id }),
  });

  if (error) {
    return (
      <BlogPostPageNav>
        <ErrorMessage error={error} />
      </BlogPostPageNav>
    );
  }

  if (isPending) {
    return (
      <BlogPostPageNav>
        <BlogPostPageSkeleton />
      </BlogPostPageNav>
    );
  }

  if (!data) {
    return (
      <BlogPostPageNav>
        <Typography>{t("no-posts")}</Typography>
      </BlogPostPageNav>
    );
  }

  return (
    <BlogPostPageNav>
      <BlogPost post={data} />
    </BlogPostPageNav>
  );
}
