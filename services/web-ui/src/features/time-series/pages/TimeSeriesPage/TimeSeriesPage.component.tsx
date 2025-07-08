import { ReactElement } from "react";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import { TimeSeriesDetails } from "src/api";
import { timeSince } from "src/utils/time";

import { AddTimeSeriesPointForm } from "../../components/AddTimeSeriesPointForm";

interface TimeSeriesPageComponentProps {
  timeSeries: TimeSeriesDetails;
}

export function TimeSeriesPageComponent({
  timeSeries,
}: TimeSeriesPageComponentProps): ReactElement {
  return (
    <Box>
      <Typography variant="h6">{timeSeries.name}</Typography>
      <Typography color="textSecondary">{timeSeries.description}</Typography>

      <List>
        {timeSeries.points.map((point) => (
          <ListItem key={point.id}>
            <ListItemText
              primary={point.value}
              secondary={timeSince(point.createdAt)}
            />
          </ListItem>
        ))}
      </List>

      <AddTimeSeriesPointForm timeSeriesId={timeSeries.id} />
    </Box>
  );
}
