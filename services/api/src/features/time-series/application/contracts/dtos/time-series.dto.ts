import { TimeSeriesListItem } from "./time-series-list-item.dto";
import { TimeSeriesPointDetails } from "./time-series-point.dto";

export class TimeSeriesDetails extends TimeSeriesListItem {
  labels!: string[];
  points!: TimeSeriesPointDetails[];
}
