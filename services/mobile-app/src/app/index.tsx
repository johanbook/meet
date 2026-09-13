import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { blogsApi } from "src/apis";
import { BlogPostDetails } from "src/api";
import { Screen } from "src/components/nav/Screen";
import { IconButton, InfiniteList, Typography } from "src/components/ui";
import { CacheKeyEnum } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";
import { BlogPost } from "src/features/blogs/components/BlogPost/BlogPost";
import { registerBlogFeature } from "src/features/blogs";

const ITEMS_PER_PAGE = 10;

registerBlogFeature();

function FeedSkeleton() {
  return (
    <View style={{ padding: 16 }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={{ borderBottomWidth: 1, padding: 16 }}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={{ borderRadius: 20, height: 40, width: 40 }} />
            <View
              style={{
                borderBottomWidth: 1,
                flex: 1,
                height: 16,
                marginLeft: 8,
              }}
            />
          </View>
          <View style={{ height: 56, marginTop: 8 }} />
        </View>
      ))}
    </View>
  );
}

export default function BlogPostListPage() {
  const router = useRouter();

  const query = useInfiniteQuery({
    queryKey: [CacheKeyEnum.BlogPosts],
    queryFn: ({ pageParam = 0 }) =>
      blogsApi.getBlogPosts({
        skip: pageParam * ITEMS_PER_PAGE,
        top: (pageParam + 1) * ITEMS_PER_PAGE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length >= ITEMS_PER_PAGE ? pages.length : undefined,
  });

  const posts: BlogPostDetails[] =
    query.data?.pages.flatMap((page) => page) ?? [];

  if (query.isLoading && posts.length === 0) {
    return (
      <Screen>
        <FeedSkeleton />
      </Screen>
    );
  }

  if (query.error) {
    return (
      <Screen>
        <ErrorView
          description="Try again in a bit."
          message="Unable to fetch moments"
        />
      </Screen>
    );
  }

  return (
    <Screen
      headerRight={
        <IconButton
          accessibilityLabel="view photos"
          icon="viewDay"
          onPress={() => router.push("/blog/photos")}
        />
      }
    >
      <InfiniteList
        emptyComponent={
          <View style={{ alignItems: "center", padding: 40 }}>
            <Typography color="textSecondary" variant="body2">
              Seems like no one has shared anything here yet. Be the first one
              to share a moment!
            </Typography>
          </View>
        }
        hasNextPage={query.hasNextPage}
        items={posts}
        onEndReached={() => query.fetchNextPage()}
        renderItem={(post, index) => (
          <BlogPost key={`${post.id}-${index}`} post={post} />
        )}
      />
    </Screen>
  );
}
