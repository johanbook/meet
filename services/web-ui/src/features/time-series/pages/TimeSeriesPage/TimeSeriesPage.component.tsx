import { ReactElement } from "react";

import { Box, Typography } from "@mui/material";

import { TimeSeriesDetails } from "src/api";

interface TimeSeriesPageComponentProps {
  timeSeries: TimeSeriesDetails;
}

export function TimeSeriesPageComponent({
  timeSeries,
}: TimeSeriesPageComponentProps): ReactElement {
  return (
    <Box>
      <Typography variant="h6">{timeSeries.name}</Typography>
      <Typography>{timeSeries.description}</Typography>
    </Box>
  );
}
