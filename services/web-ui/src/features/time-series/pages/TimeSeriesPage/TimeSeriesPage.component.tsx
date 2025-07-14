import { ReactElement } from "react";

import { AddRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ChipProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";

import { TimeSeriesDetails } from "src/api";
import { Fab } from "src/components/ui/Fab";
import { useDialog } from "src/core/dialog";
import { timeSince } from "src/utils/time";

import { AddTimeSeriesPointDialog } from "../../components/AddTimeSeriesPointDialog";
import { getAggregatedData, getTimeSeriesStats } from "./TimeSeriesPage.utils";

const LABEL_COLORS: ChipProps["color"][] = ["primary", "secondary"];

const getLabelColor = (index: number) =>
  LABEL_COLORS[index % LABEL_COLORS.length];

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

  const data = getAggregatedData(timeSeries);

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
          <BarChart
            dataset={data}
            height={300}
            series={timeSeries.labels.map((label) => ({
              dataKey: label,
              stack: "default",
            }))}
            xAxis={[{ dataKey: "date" }]}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography variant="h6">Data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {timeSeries.points.map((point) => (
              <ListItem key={point.id}>
                <ListItemIcon>
                  <Avatar>{point.value}</Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box
                      component="span"
                      sx={{ display: "flex", gap: 2, alignItems: "center" }}
                    >
                      <span>{point.description}</span>
                      <Chip
                        color={getLabelColor(
                          timeSeries.labels.indexOf(point.label),
                        )}
                        label={point.label}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={timeSince(point.createdAt)}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Fab onClick={handleOpenForm}>
        <AddRounded />
      </Fab>
    </Box>
  );
}
