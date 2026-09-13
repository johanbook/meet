import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { profileApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { ProfileAvatar } from "src/components/shared/ProfileAvatar/ProfileAvatar";
import { Skeleton } from "src/components/ui";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { useTheme } from "src/core/theme";
import { ErrorView } from "src/views/ErrorView";

export default function ProfileDetailsPage() {
  const { id: idParam = "" } = useLocalSearchParams<{ id?: string }>();
  const id = Number(idParam);
  const isIdValid = Boolean(idParam) && !Number.isNaN(id);
  const theme = useTheme();

  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.CurrentProfile, id],
    queryFn: () => profileApi.getProfile({ id }),
    enabled: isIdValid,
  });

  if (!isIdValid) {
    return (
      <Screen navBackTo="/">
        <View style={{ alignItems: "center", padding: 48 }}>
          <ErrorView message="Unable to find profile" />
        </View>
      </Screen>
    );
  }

  if (isLoading) {
    return (
      <Screen navBackTo="/">
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
      <Screen navBackTo="/">
        <View style={{ alignItems: "center", padding: 48 }}>
          <ErrorView
            description="Try again in a bit."
            message="Unable to fetch profile"
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen navBackTo="/">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", padding: 24 }}>
          <ProfileAvatar name={data.name} size={96} src={data.photo?.url} />
          <Text
            style={{
              color: theme.palette.text.primary,
              fontSize: 24,
              marginTop: 8,
            }}
          >
            {data.name}
          </Text>
          <Text
            style={{
              color: theme.palette.text.secondary,
              fontSize: 16,
              marginTop: 4,
            }}
          >
            {data.description}
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}