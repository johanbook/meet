import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

import { ResponseError } from "src/api";
import { blogsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { Skeleton } from "src/components/ui";
import { CacheKeyEnum } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";
import { BlogPost } from "src/features/blogs/components/BlogPost/BlogPost";

function PostSkeleton() {
  return (
    <View style={{ padding: 16 }}>
      <Skeleton height={40} width={40} />
      <Skeleton height={16} />
      <Skeleton height={56} />
      <Skeleton height={200} />
    </View>
  );
}

export default function BlogPostPage() {
  const { id = "" } = useLocalSearchParams<{ id?: string }>();

  const query = useQuery({
    queryKey: [CacheKeyEnum.BlogPosts, id],
    queryFn: () => blogsApi.getBlogPost({ id }),
  });

  if (query.isLoading) {
    return (
      <Screen navBackTo="/">
        <PostSkeleton />
      </Screen>
    );
  }

  if (
    query.error instanceof ResponseError &&
    query.error.response.status === 404
  ) {
    return (
      <Screen navBackTo="/">
        <ErrorView
          description="Make sure you are in the right group"
          message="Post not found"
        />
      </Screen>
    );
  }

  if (query.error || !query.data) {
    return (
      <Screen navBackTo="/">
        <ErrorView
          description="Try again in a bit."
          message="Unable to fetch moment"
        />
      </Screen>
    );
  }

  return (
    <Screen navBackTo="/">
      <ScrollView style={{ flex: 1 }}>
        <BlogPost alwaysShowComments post={query.data} />
      </ScrollView>
    </Screen>
  );
}