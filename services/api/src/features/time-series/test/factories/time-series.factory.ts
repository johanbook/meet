import { TimeSeriesPoint } from "src/features/time-series/infrastructure/entities/time-series-point.entity";
import { TimeSeries } from "src/features/time-series/infrastructure/entities/time-series.entity";

export function makeTimeSeries(props: Partial<TimeSeries> = {}): TimeSeries {
  const timeSeries = new TimeSeries();

  timeSeries.id = props.id || "1";
  timeSeries.name = props.name || "my-time-series";
  timeSeries.description = props.description || "my-description";
  timeSeries.points = props.points || [];
  timeSeries.profileId = props.profileId || ("my-profile-id" as any);
  timeSeries.organizationId =
    props.organizationId || ("my-organization-id" as any);

  return timeSeries;
}

export function makeTimeSeriesPoint(
  props: Partial<TimeSeriesPoint> = {},
): TimeSeriesPoint {
  const point = new TimeSeriesPoint();

  point.id = props.id || "1";
  point.timeSeriesId = props.timeSeriesId || "1";
  point.value = props.value || 123;
  point.description = props.description || "my-description";
  point.label = props.label || "my-label";

  return point;
}
