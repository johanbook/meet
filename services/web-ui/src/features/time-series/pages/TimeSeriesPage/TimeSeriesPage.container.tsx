import { ReactElement } from "react";
import { useParams } from "react-router";

import { timeSeriesApi } from "src/apis";
import { useQuery } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { TimeSeriesPageComponent } from "./TimeSeriesPage.component";
import { TimeSeriesPageNav } from "./TimeSeriesPage.nav";
import { TimeSeriesPageSkeleton } from "./TimeSeriesPage.skeleton";

export function TimeSeriesPageContainer(): ReactElement {
  const { id = "" } = useParams<{ id: string }>();

  const { error, data, isLoading } = useQuery({
    queryKey: [CacheKeysConstants.TimeSeries, id],
    queryFn: () => timeSeriesApi.getTimeSeriesById({ id }),
  });

  if (isLoading) {
    return (
      <TimeSeriesPageNav>
        <TimeSeriesPageSkeleton />
      </TimeSeriesPageNav>
    );
  }

  if (error || !data) {
    return (
      <TimeSeriesPageNav>
        <ErrorView />
      </TimeSeriesPageNav>
    );
  }

  return (
    <TimeSeriesPageNav>
      <TimeSeriesPageComponent timeSeries={data} />
    </TimeSeriesPageNav>
  );
}
