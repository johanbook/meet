import { TimeSeriesPoint } from "../../infrastructure/entities/time-series-point.entity";

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
