import { ReactElement } from "react";

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
import { Fab } from "src/components/ui/Fab";
import { useDialog } from "src/core/dialog";

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
  const { openDialog } = useDialog();

  const handleOpenForm = () => {
    openDialog(AddTimeSeriesPointDialog, { timeSeriesId: timeSeries.id });
  };

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

      <Fab onClick={handleOpenForm}>
        <AddRounded />
      </Fab>
    </Box>
  );
}
