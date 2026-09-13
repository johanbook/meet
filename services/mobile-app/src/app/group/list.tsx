import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { OrganizationDetails, SwitchOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { OrganizationAvatar } from "src/components/shared/OrganizationAvatar/OrganizationAvatar";
import {
  EmptyState,
  Fab,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "src/components/ui";
import {
  CacheKeyEnum,
  useMutation,
  useQuery,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { ErrorView } from "src/views/ErrorView";

export default function GroupListPage() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.OrganizationList],
    queryFn: () => organizationsApi.getOrganizations(),
  });

  const switchMutation = useMutation({
    mutationFn: (switchOrganizationCommand: SwitchOrganizationCommand) =>
      organizationsApi.switchOrganization({ switchOrganizationCommand }),
  });

  const fab = <Fab onPress={() => router.push("/group/create")} />;

  function handleSwitch(organization: OrganizationDetails): void {
    switchMutation.mutate(
      { organizationId: organization.id },
      {
        onError: () => snackbar.error("Unable to switch group"),
        onSuccess: () => {
          queryClient.resetQueries();
          snackbar.success("Switched group");
          router.replace("/");
        },
      },
    );
  }

  if (isLoading) {
    return (
      <Screen fab={fab} title="Groups">
        <List>
          {[0, 1, 2].map((index) => (
            <ListItem key={index}>
              <View
                style={{ alignItems: "center", flexDirection: "row", gap: 8 }}
              >
                <Skeleton borderRadius={20} height={40} width={40} />
                <Skeleton height={16} width="60%" />
              </View>
            </ListItem>
          ))}
        </List>
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen fab={fab} title="Groups">
        <ErrorView />
      </Screen>
    );
  }

  if (data.length === 0) {
    return (
      <Screen fab={fab} title="Groups">
        <EmptyState message="You have no groups" />
      </Screen>
    );
  }

  return (
    <Screen fab={fab} title="Groups">
      <ScrollView style={{ flex: 1 }}>
        <List>
          {data.map((organization) => (
            <ListItem
              key={organization.id}
              onPress={() => handleSwitch(organization)}
            >
              <View
                style={{ alignItems: "center", flexDirection: "row", gap: 8 }}
              >
                <OrganizationAvatar
                  name={organization.name}
                  src={organization.photo?.url}
                />
                <View style={{ flex: 1 }}>
                  <Typography numberOfLines={1}>{organization.name}</Typography>
                </View>
              </View>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    </Screen>
  );
}
