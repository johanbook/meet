import { useCurrentRouteInfo, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { ResponseError } from "src/api";
import { timeSeriesApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import {
  Button,
  Card,
  ConfirmationDialogProps,
  ErrorMessage,
  Fab,
  Section,
  Skeleton,
  Typography,
  useConfirmDialog,
} from "src/components/ui";
import { GlobalDialogProps, useDialog } from "src/core/dialog";
import {
  CacheKeyEnum,
  useMutation,
  useQuery,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { ErrorView } from "src/views/ErrorView";
import { AddTimeSeriesPointDialog } from "src/features/time-series/components/AddTimeSeriesPointDialog/AddTimeSeriesPointDialog";
import { TimeSeriesChart } from "src/features/time-series/components/TimeSeriesChart/TimeSeriesChart";
import { TimeSeriesPointList } from "src/features/time-series/components/TimeSeriesPointList/TimeSeriesPointList";
import { getTimeSeriesStats } from "src/features/time-series/utils/stats.helper";

interface TimeSeriesStat {
  label: string;
  value: number;
}

export default function TimeSeriesPage() {
  const routeInfo = useCurrentRouteInfo();
  const idParam = routeInfo?.params.id;

  // Expo-router surfaces the "[id]" dynamic segment through route params.
  const id = typeof idParam === "string" ? idParam : "";
  const router = useRouter();
  const snackbar = useSnackbar();
  const { openDialog } = useDialog();
  const { confirmWithDialog } = useConfirmDialog();

  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.TimeSeries, id],
    queryFn: () => timeSeriesApi.getTimeSeriesById({ id }),
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      timeSeriesApi.deleteTimeSeries({
        deleteTimeSeriesCommand: { id },
      }),
  });

  const fab = (
    <Fab
      icon="add"
      onPress={() => openDialog(AddTimeSeriesPointDialog, { timeSeriesId: id })}
    />
  );

  if (isLoading) {
    return (
      <Screen fab={fab} navBackTo="/time-series">
        <View style={{ padding: 16 }}>
          <Skeleton height={20} />
          <Skeleton height={16} width="70%" />
          <View style={{ height: 16 }} />
          <Skeleton height={240} />
        </View>
      </Screen>
    );
  }

  if (error || !data) {
    const isNotFound =
      !data ||
      (error instanceof ResponseError && error.response?.status === 404);

    return (
      <Screen fab={fab} navBackTo="/time-series">
        {isNotFound ? (
          <ErrorView message="Time series not found" />
        ) : (
          <ErrorMessage error={error} />
        )}
      </Screen>
    );
  }

  // Weekly/day-of-week summaries are not supported yet.
  let stats: TimeSeriesStat[] = [];

  try {
    stats = getTimeSeriesStats(data);
  } catch {
    stats = [];
  }

  function handleDelete(): void {
    // The shared useConfirmDialog types its argument with the full
    // ConfirmationDialogProps (incl. provider-injected fields); the dialog
    // provider fills those in, so only the caller-facing fields are passed.
    const props = {
      description: "Deleting this time series will remove it permanently.",
      onConfirm: (onSuccess: () => void) =>
        deleteMutation.mutate(undefined, {
          onError: () => snackbar.error("Failed to delete"),
          onSuccess: () => {
            snackbar.success("Time series deleted");
            onSuccess();
            router.replace("/time-series");
          },
        }),
      title: "Delete time series?",
    } satisfies Omit<ConfirmationDialogProps, keyof GlobalDialogProps>;

    confirmWithDialog(props as ConfirmationDialogProps);
  }

  return (
    <Screen fab={fab} navBackTo="/time-series" title={data.name}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Typography color="textSecondary">{data.description}</Typography>

          {stats.length > 0 ? (
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}
            >
              {stats.map(({ label, value }) => (
                <View key={label} style={{ margin: 4 }}>
                  <Card>
                    <Typography variant="body2">{label}</Typography>
                    <Typography variant="h4">{value}</Typography>
                  </Card>
                </View>
              ))}
            </View>
          ) : null}

          <View style={{ marginTop: 8 }}>
            <Section title="Charts">
              <TimeSeriesChart timeSeries={data} />
            </Section>
          </View>
          <View style={{ marginTop: 8 }}>
            <Section openByDefault title="Data">
              <TimeSeriesPointList timeSeries={data} />
            </Section>
          </View>
          <View style={{ marginTop: 8 }}>
            <Section title="Settings">
              <View>
                <Typography color="textSecondary">
                  Delete time series
                </Typography>
                <Button
                  color="error"
                  loading={deleteMutation.isPending}
                  onPress={handleDelete}
                  variant="contained"
                >
                  Delete
                </Button>
              </View>
            </Section>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}