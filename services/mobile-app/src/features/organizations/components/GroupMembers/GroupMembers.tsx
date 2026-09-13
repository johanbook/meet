import { View } from "react-native";

import { organizationsApi } from "src/apis";
import { ProfileAvatar } from "src/components/shared/ProfileAvatar/ProfileAvatar";
import {
  Chip,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "src/components/ui";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { timeSince } from "src/utils";
import { ErrorView } from "src/views/ErrorView";

export function GroupMembers() {
  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.CurrentOrganizationMembers],
    queryFn: () => organizationsApi.getCurrentOrganizationMembers(),
  });

  const header = (
    <View style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
      <Typography color="textSecondary" variant="h6">
        Members
      </Typography>
    </View>
  );

  if (isLoading) {
    return (
      <>
        {header}
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
      </>
    );
  }

  if (error || !data) {
    return <ErrorView message="Unable to retrieve organization members" />;
  }

  return (
    <>
      {header}
      <List>
        {data.map((member) => (
          <ListItem key={member.id}>
            <View style={{ alignItems: "center", flexDirection: "row", gap: 8 }}>
              <ProfileAvatar name={member.name} src={member.imageUrl} />
              <View style={{ flex: 1 }}>
                <View style={{ alignItems: "center", flexDirection: "row", gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Typography numberOfLines={1}>{member.name}</Typography>
                  </View>
                  <Chip label={member.role} />
                </View>
                <Typography color="textSecondary" variant="caption">
                  {timeSince(member.joinedAt)}
                </Typography>
              </View>
            </View>
          </ListItem>
        ))}
      </List>
    </>
  );
}