import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { timeSeriesApi } from "src/apis";
import { CreateTimeSeriesCommand } from "src/api";
import { Screen } from "src/components/nav/Screen";
import { Button, TextField } from "src/components/ui";
import { required, useForm } from "src/core/forms";
import {
  CacheKeyEnum,
  useMutation,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export default function CreateTimeSeriesPage() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm<CreateTimeSeriesCommand>(
    {
      name: "",
      description: "",
    },
    {
      name: required(),
      description: () => false,
    },
  );

  const mutation = useMutation({
    mutationFn: (createTimeSeriesCommand: CreateTimeSeriesCommand) =>
      timeSeriesApi.createTimeSeries({ createTimeSeriesCommand }),
  });

  function handleSubmit(): void {
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    mutation.mutate(data, {
      onError: () => snackbar.error("Unable to create time series"),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeyEnum.TimeSeries],
        });
        form.reset();
        snackbar.success("Time series created");
        router.replace("/time-series");
      },
    });
  }

  return (
    <Screen navBackTo="/time-series" title="Create time series">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <TextField
            error={form.state.name.error}
            label="Name"
            onValueChange={(value) => form.setValue({ name: value })}
            value={form.state.name.value}
          />
          <View style={{ height: 16 }} />
          <TextField
            error={form.state.description.error}
            label="Description"
            multiline
            onValueChange={(value) => form.setValue({ description: value })}
            value={form.state.description.value}
          />
          <View style={{ height: 16 }} />
          <Button
            color="primary"
            disabled={!form.state.name.value || mutation.isPending}
            onPress={handleSubmit}
            variant="contained"
          >
            Create
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}