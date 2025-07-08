import { ReactElement } from "react";
import { Link } from "react-router";

import { List, ListItemButton, ListItemText } from "@mui/material";

import { TimeSeriesDetails } from "src/api";

interface TimeSeriesListPageComponentProps {
  timeSeries: TimeSeriesDetails[];
}

export function TimeSeriesListPageComponent({
  timeSeries,
}: TimeSeriesListPageComponentProps): ReactElement {
  return (
    <List>
      {timeSeries.map((series) => (
        <ListItemButton
          component={Link}
          key={series.id}
          to={`/time-series/${series.id}`}
        >
          <ListItemText primary={series.name} secondary={series.description} />
        </ListItemButton>
      ))}
    </List>
  );
}
