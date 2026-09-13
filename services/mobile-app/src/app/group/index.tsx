import { ScrollView, View } from "react-native";

import { organizationsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { OrganizationAvatar } from "src/components/shared/OrganizationAvatar/OrganizationAvatar";
import { List, ListItem, Skeleton, Typography } from "src/components/ui";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { GroupMembers, GroupSettings } from "src/features/organizations";
import { ErrorView } from "src/views/ErrorView";

export default function GroupPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  if (isLoading) {
    return (
      <Screen title="Group">
        <View style={{ padding: 16 }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 12 }}>
            <Skeleton borderRadius={43} height={86} width={86} />
            <View style={{ flex: 1 }}>
              <Skeleton height={24} width="60%" />
            </View>
          </View>
          <View style={{ height: 24 }} />
          <List>
            {[0, 1, 2].map((index) => (
              <ListItem key={index}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Skeleton borderRadius={20} height={40} width={40} />
                  <View style={{ flex: 1, gap: 4, marginLeft: 8 }}>
                    <Skeleton height={16} width="60%" />
                    <Skeleton height={14} width="40%" />
                  </View>
                </View>
              </ListItem>
            ))}
          </List>
        </View>
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen title="Group">
        <ErrorView />
      </Screen>
    );
  }

  return (
    <Screen title="Group">
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: 12,
            padding: 16,
          }}
        >
          <OrganizationAvatar
            name={data.name}
            size={86}
            src={data.photo?.url}
          />
          <View style={{ flex: 1 }}>
            <Typography numberOfLines={1} variant="h5">
              {data.name}
            </Typography>
          </View>
        </View>
        <GroupMembers />
        <GroupSettings data={data} />
      </ScrollView>
    </Screen>
  );
}
