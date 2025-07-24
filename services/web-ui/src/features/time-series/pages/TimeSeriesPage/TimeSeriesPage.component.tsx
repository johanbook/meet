import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { AddRounded } from "@mui/icons-material";
import { Box, CardContent, Stack, Typography } from "@mui/material";

import { TimeSeriesDetails } from "src/api";
import { timeSeriesApi } from "src/apis";
import { Button, Card, CollapsibleCard, Fab } from "src/components/ui";
import { useConfirmDialog, useDialog } from "src/core/dialog";
import { useMutation } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

import { AddTimeSeriesPointDialog } from "../../components/AddTimeSeriesPointDialog";
import { TimeSeriesChart } from "../../components/TimeSeriesChart";
import { TimeSeriesPointList } from "../../components/TimeSeriesPointList";
import { getTimeSeriesStats } from "../../utils/stats.helper";

interface TimeSeriesPageComponentProps {
  timeSeries: TimeSeriesDetails;
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

  const stats = getTimeSeriesStats(timeSeries);

  return (
    <Box>
      <Typography color="textSecondary">{timeSeries.description}</Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        {stats.map(({ label, value }) => (
          <Card key={label}>
            <CardContent>
              <Typography gutterBottom>{label} </Typography>
              <Typography align="center" variant="h4">
                {value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Stack spacing={2}>
        <CollapsibleCard sx={{ p: 2 }} title="Charts">
          <TimeSeriesChart timeSeries={timeSeries} />
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
