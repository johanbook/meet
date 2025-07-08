import { ReactElement } from "react";
import { useParams } from "react-router";

import { Box, CircularProgress } from "@mui/material";

import { timeSeriesApi } from "src/apis";
import { useQuery } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { TimeSeriesPageComponent } from "./TimeSeriesPage.component";
import { TimeSeriesPageNav } from "./TimeSeriesPage.nav";

export function TimeSeriesPageContainer(): ReactElement {
  const { id = "" } = useParams<{ id: string }>();

  const { error, data, isLoading } = useQuery({
    queryKey: [CacheKeysConstants.TimeSeries, id],
    queryFn: () => timeSeriesApi.getTimeSeriesById({ id }),
  });

  if (isLoading) {
    return (
      <TimeSeriesPageNav>
        <CircularProgress />
      </TimeSeriesPageNav>
    );
  }

  if (error) {
    return (
      <TimeSeriesPageNav>
        <ErrorView />
      </TimeSeriesPageNav>
    );
  }

  return (
    <TimeSeriesPageNav>
      <Box sx={{ p: 2 }}>
        {data && <TimeSeriesPageComponent timeSeries={data} />}
      </Box>
    </TimeSeriesPageNav>
  );
}
