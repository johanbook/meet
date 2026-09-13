import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { timeSeriesApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import {
  EmptyState,
  Fab,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from "src/components/ui";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

export default function TimeSeriesListPage() {
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.TimeSeries],
    queryFn: () => timeSeriesApi.getTimeSeries(),
  });

  const fab = <Fab onPress={() => router.push("/time-series/create")} />;

  if (isLoading) {
    return (
      <Screen fab={fab} title="Time-series">
        <View style={{ padding: 16 }}>
          {Array.from({ length: 9 }).map((_, index) => (
            <View key={index} style={{ paddingVertical: 8 }}>
              <Skeleton height={20} />
              <Skeleton height={14} width="60%" />
            </View>
          ))}
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen fab={fab} title="Time-series">
        <ErrorView />
      </Screen>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Screen fab={fab} title="Time-series">
        <EmptyState message="No time series created yet" />
      </Screen>
    );
  }

  return (
    <Screen fab={fab} title="Time-series">
      <ScrollView style={{ flex: 1 }}>
        <List>
          {data.map((series) => (
            <ListItem
              key={series.id}
              onPress={() => router.replace(`/time-series/${series.id}`)}
            >
              <ListItemText
                primary={series.name}
                secondary={series.description}
              />
            </ListItem>
          ))}
        </List>
      </ScrollView>
    </Screen>
  );
}
