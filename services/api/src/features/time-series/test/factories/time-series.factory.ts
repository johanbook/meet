import { TimeSeries } from "../../infrastructure/entities/time-series.entity";

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
