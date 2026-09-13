import { ScrollView, View } from "react-native";

import { profileApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { Skeleton } from "src/components/ui";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { CurrentProfileDetails } from "src/features/profiles";
import { ErrorView } from "src/views/ErrorView";

export default function ProfilePage() {
  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.CurrentProfile],
    queryFn: () => profileApi.getCurrentProfile(),
  });

  if (isLoading) {
    return (
      <Screen title="Profile">
        <View style={{ alignItems: "center", padding: 16 }}>
          <Skeleton borderRadius={48} height={96} width={96} />
          <View style={{ height: 8 }} />
          <Skeleton height={24} width="50%" />
        </View>
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen title="Profile">
        <ErrorView />
      </Screen>
    );
  }

  return (
    <Screen title="Profile">
      <ScrollView style={{ flex: 1 }}>
        <CurrentProfileDetails profile={data} />
      </ScrollView>
    </Screen>
  );
}
