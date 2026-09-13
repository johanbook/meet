import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Pressable, ScrollView, View } from "react-native";

import { blogsApi } from "src/apis";
import { BlogPhotoDetails } from "src/api";
import { Screen } from "src/components/nav/Screen";
import { IconButton, Typography } from "src/components/ui";
import { CacheKeyEnum } from "src/core/query";
import { groupBy, getDate } from "src/utils";
import { ErrorView } from "src/views/ErrorView";

const ITEMS_PER_PAGE = 10;

export default function BlogPhotoListPage() {
  const router = useRouter();

  const query = useInfiniteQuery({
    queryKey: [CacheKeyEnum.BlogPhotoList],
    queryFn: ({ pageParam = 0 }) =>
      blogsApi.getBlogPhotoList({
        skip: pageParam * ITEMS_PER_PAGE,
        top: (pageParam + 1) * ITEMS_PER_PAGE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length >= ITEMS_PER_PAGE ? pages.length : undefined,
  });

  const photos: BlogPhotoDetails[] = query.data?.pages.flatMap(
    (page) => page,
  ) ?? [];

  if (query.error) {
    return (
      <Screen>
        <ErrorView
          description="Try again in a bit."
          message="Unable to fetch photos"
        />
      </Screen>
    );
  }

  const grouped = groupBy(photos, (photo) =>
    getDate(photo.createdAt.toISOString()),
  );

  return (
    <Screen
      headerRight={
        <IconButton
          accessibilityLabel="back to moments"
          icon="viewDay"
          onPress={() => router.push("/")}
        />
      }
    >
      <ScrollView
        style={{ flex: 1 }}
        onScroll={(event) => {
          if (query.hasNextPage && event.nativeEvent.contentOffset.y > 0) {
            query.fetchNextPage();
          }
        }}
      >
        {photos.length === 0 ? (
          <View style={{ alignItems: "center", padding: 40 }}>
            <Typography color="textSecondary" variant="body2">
              No photos
            </Typography>
          </View>
        ) : (
          Object.entries(grouped).map(([date, datePhotos]) => (
            <View key={date} style={{ padding: 8 }}>
              <Typography color="textSecondary" variant="body2">
                {date}
              </Typography>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {datePhotos.map((photo) => (
                  <Pressable
                    accessibilityLabel="open post"
                    accessibilityRole="button"
                    key={photo.id}
                    onPress={() => router.push(`/blog/${photo.blogId}`)}
                    style={({ pressed }) => ({
                      backgroundColor: "#e0e0e0",
                      margin: 4,
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <Image
                      source={{ uri: photo.url }}
                      style={{ height: 100, width: 100 }}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}