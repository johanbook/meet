import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { timeSeriesApi } from "src/apis";
import { useQuery } from "src/core/query";
import { CacheKeyEnum } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { TimeSeriesListPageComponent } from "./TimeSeriesListPage.component";
import { TimeSeriesListPageNav } from "./TimeSeriesListPage.nav";
import { TimeSeriesListPageSkeleton } from "./TimeSeriesListPage.skeleton";

export function TimeSeriesListPageContainer(): ReactElement {
  const { error, data, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.TimeSeries],
    queryFn: () => timeSeriesApi.getTimeSeries(),
  });

  if (isLoading) {
    return (
      <TimeSeriesListPageNav>
        <TimeSeriesListPageSkeleton />
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
        <Typography>No time series created yet</Typography>
      </TimeSeriesListPageNav>
    );
  }

  return (
    <TimeSeriesListPageNav>
      <TimeSeriesListPageComponent timeSeries={data} />
    </TimeSeriesListPageNav>
  );
}
