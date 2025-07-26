import { ReactElement } from "react";
import { useParams } from "react-router";

import { Typography } from "@mui/material";

import { ResponseError } from "src/api";
import { blogsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useTranslation } from "src/core/i18n";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { useMetaData } from "src/hooks/useMetaData";
import { ErrorView } from "src/views/ErrorView";

import { BlogPost } from "../../components/BlogPost";
import { BlogPostPageNav } from "./BlogPostPage.nav";
import { BlogPostPageSkeleton } from "./BlogPostPage.skeleton";

export function BlogPostPageContainer(): ReactElement {
  useMetaData({ title: "Post" });

  const { t } = useTranslation("blog");
  const { id = "" } = useParams();

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeyEnum.BlogPosts, id],
    queryFn: () => blogsApi.getBlogPost({ id }),
  });

  if (error) {
    if (error instanceof ResponseError && error.response.status === 404) {
      return (
        <BlogPostPageNav>
          <ErrorView
            message="Post not found"
            description="Make sure you are in the right group"
          />
        </BlogPostPageNav>
      );
    }

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
      <BlogPost alwaysShowComments post={data} />
    </BlogPostPageNav>
  );
}
