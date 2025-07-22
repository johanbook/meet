import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { AddRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { TimeSeriesDetails } from "src/api";
import { timeSeriesApi } from "src/apis";
import { Button } from "src/components/ui";
import { Fab } from "src/components/ui/Fab";
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

      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 4 }}>
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

      <Accordion>
        <AccordionSummary>
          <Typography variant="h6">Charts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TimeSeriesChart timeSeries={timeSeries} />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography variant="h6">Data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TimeSeriesPointList timeSeries={timeSeries} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography variant="h6">Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary" gutterBottom>
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
        </AccordionDetails>
      </Accordion>

      <Fab onClick={handleOpenForm}>
        <AddRounded />
      </Fab>
    </Box>
  );
}
