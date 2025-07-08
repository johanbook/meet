import { ReactElement } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

import { timeSeriesApi } from "src/apis";
import { useQuery } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { TimeSeriesListPageComponent } from "./TimeSeriesListPage.component";
import { TimeSeriesListPageNav } from "./TimeSeriesListPage.nav";

export function TimeSeriesListPageContainer(): ReactElement {
  const { error, data, isLoading } = useQuery({
    queryKey: [CacheKeysConstants.TimeSeries],
    queryFn: () => timeSeriesApi.getTimeSeries(),
  });

  if (isLoading) {
    return (
      <TimeSeriesListPageNav>
        <CircularProgress />
      </TimeSeriesListPageNav>
    );
  }

  if (error) {
    return (
      <TimeSeriesListPageNav>
        <ErrorView />
      </TimeSeriesListPageNav>
    );
  }

  if (!data || data.length === 0) {
    return (
      <TimeSeriesListPageNav>
        <Box sx={{ py: 2, px: 2 }}>
          <Typography>No time series created yet</Typography>
        </Box>
      </TimeSeriesListPageNav>
    );
  }

  return (
    <TimeSeriesListPageNav>
      <Box sx={{ py: 2, px: 2 }}>
        <TimeSeriesListPageComponent timeSeries={data || []} />
      </Box>
    </TimeSeriesListPageNav>
  );
}
