import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { AddRounded } from "@mui/icons-material";
import { Box, CardContent, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import { TimeSeriesDetails } from "src/api";
import { timeSeriesApi } from "src/apis";
import { Button, Card, CollapsibleCard, Fab } from "src/components/ui";
import { useConfirmDialog, useDialog } from "src/core/dialog";
import { useMutation } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

import { AddTimeSeriesPointDialog } from "../../components/AddTimeSeriesPointDialog";
import { TimeSeriesChart } from "../../components/TimeSeriesChart";
import { TimeSeriesPointList } from "../../components/TimeSeriesPointList";
import {
  CadenceStats,
  getCadenceStats,
  getTimeSeriesStats,
} from "../../utils/stats.helper";

interface TimeSeriesPageComponentProps {
  timeSeries: TimeSeriesDetails;
}

function getDeltaColor(delta: number): string {
  if (delta > 0) {
    return "success.main";
  }
  if (delta < 0) {
    return "error.main";
  }
  return "textSecondary";
}

const plural = (count: number, noun: string): string =>
  `${count} ${noun}${count === 1 ? "" : "s"}`;

const formatNextExpected = (date: Date, daysUntil: number): string => {
  const expected = dayjs(date).format("MMM D, YYYY");

  if (daysUntil > 0) {
    return `${expected} (in ${plural(daysUntil, "day")})`;
  }
  if (daysUntil < 0) {
    return `${expected} (overdue by ${plural(-daysUntil, "day")})`;
  }
  return `${expected} (today)`;
};

interface CadenceRowProps {
  label: string;
  value: string;
}

function CadenceRow({ label, value }: CadenceRowProps): ReactElement {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography color="textSecondary">{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}

function renderCadence(cadence: CadenceStats): ReactElement {
  const { lastEventDate, daysSinceLastEvent } = cadence;

  if (lastEventDate === undefined) {
    return <Typography color="textSecondary">No points added yet</Typography>;
  }

  return (
    <Stack spacing={1}>
      <CadenceRow
        label="Last event"
        value={dayjs(lastEventDate).format("MMM D, YYYY")}
      />
      <CadenceRow
        label="Days since"
        value={plural(daysSinceLastEvent ?? 0, "day")}
      />
      {cadence.averageIntervalDays !== undefined && (
        <CadenceRow
          label="Average interval"
          value={plural(Math.round(cadence.averageIntervalDays), "day")}
        />
      )}
      {cadence.longestIntervalDays !== undefined && (
        <CadenceRow
          label="Range"
          value={`${cadence.shortestIntervalDays}–${cadence.longestIntervalDays} days`}
        />
      )}
      {cadence.nextExpectedDate !== undefined &&
        cadence.daysUntilNextExpected !== undefined && (
          <CadenceRow
            label="Next expected"
            value={formatNextExpected(
              cadence.nextExpectedDate,
              cadence.daysUntilNextExpected,
            )}
          />
        )}
    </Stack>
  );
}

export function TimeSeriesPageComponent({
  timeSeries,
}: TimeSeriesPageComponentProps): ReactElement {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { openDialog } = useDialog();
  const { confirmWithDialog } = useConfirmDialog();
  const mutation = useMutation({
    mutationFn: () =>
      timeSeriesApi.deleteTimeSeries({
        deleteTimeSeriesCommand: { id: timeSeries.id },
      }),
  });

  function handleOpenForm() {
    openDialog(AddTimeSeriesPointDialog, { timeSeriesId: timeSeries.id });
  }

  function handleDelete() {
    confirmWithDialog({
      description: "Deleting this time series will remove it permanently.",
      onConfirm: async (closeDialog) =>
        await mutation.mutateAsync(undefined, {
          onError: () => snackbar.error("Failed to delete"),
          onSuccess: () => {
            snackbar.success("Time series deleted");
            navigate("/time-series");
            closeDialog();
          },
        }),
      title: "Delete time series?",
    });
  }

  const { stats, windowLabel, previousWindowLabel } =
    getTimeSeriesStats(timeSeries);
  const cadence = getCadenceStats(timeSeries.points);

  return (
    <Box>
      <Typography color="textSecondary">{timeSeries.description}</Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        {stats.map(({ label, value, previousValue }) => {
          const delta =
            previousValue === undefined ? undefined : value - previousValue;

          return (
            <Card key={label}>
              <CardContent>
                <Typography gutterBottom>
                  {label} ({windowLabel})
                </Typography>
                <Typography align="center" variant="h4">
                  {value}
                </Typography>
                {delta !== undefined && (
                  <Typography
                    align="center"
                    color={getDeltaColor(delta)}
                    variant="caption"
                  >
                    {delta >= 0 ? "+" : ""}
                    {delta} vs {previousWindowLabel}
                  </Typography>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      <Stack spacing={2}>
        <CollapsibleCard sx={{ p: 2 }} title="Charts">
          <TimeSeriesChart timeSeries={timeSeries} />
        </CollapsibleCard>

        <CollapsibleCard sx={{ p: 2 }} title="Cadence">
          {renderCadence(cadence)}
        </CollapsibleCard>

        <CollapsibleCard openByDefault sx={{ p: 2 }} title="Data">
          <TimeSeriesPointList timeSeries={timeSeries} />
        </CollapsibleCard>

        <CollapsibleCard sx={{ p: 2 }} title="Settings">
          <Typography color="textSecondary" sx={{ pb: 2 }}>
            Delete time series
          </Typography>
          <Button
            color="error"
            loading={mutation.isPending}
            onClick={handleDelete}
            variant="contained"
          >
            Delete
          </Button>
        </CollapsibleCard>
      </Stack>

      <Fab onClick={handleOpenForm}>
        <AddRounded />
      </Fab>
    </Box>
  );
}
