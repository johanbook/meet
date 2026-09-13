import { ScrollView, View } from "react-native";

import { settingsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { Skeleton, Switch, Typography } from "src/components/ui";
import {
  CacheKeyEnum,
  useMutation,
  useQuery,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { ErrorView } from "src/views/ErrorView";

export default function AppearancePage() {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.Settings],
    queryFn: () => settingsApi.getCurrentSettings(),
  });

  const mutation = useMutation({
    mutationFn: (body: object) => settingsApi.updateCurrentSettings({ body }),
  });

  function handleDarkmodeChange(value: boolean): void {
    mutation.mutate(
      { darkmode: value },
      {
        onError: () => snackbar.error("Failed to update appearance"),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [CacheKeyEnum.Settings],
          });
          snackbar.success("Appearance updated");
        },
      },
    );
  }

  if (isLoading) {
    return (
      <Screen navBackTo="/profile" title="Appearance">
        <View style={{ padding: 16 }}>
          <Skeleton height={32} width="100%" />
        </View>
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen navBackTo="/profile" title="Appearance">
        <ErrorView />
      </Screen>
    );
  }

  return (
    <Screen navBackTo="/profile" title="Appearance">
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{ alignItems: "center", flexDirection: "row", padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            <Typography>Dark mode</Typography>
          </View>
          <Switch
            disabled={mutation.isPending}
            onValueChange={handleDarkmodeChange}
            value={data.darkmode}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
