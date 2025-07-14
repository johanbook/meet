import { TimeSeriesAggregationEnum } from "../../../time-series-aggregation.enum";
import { TimeSeriesListItem } from "./time-series-list-item.dto";
import { TimeSeriesPointDetails } from "./time-series-point.dto";

export class TimeSeriesDetails extends TimeSeriesListItem {
  aggregation!: TimeSeriesAggregationEnum;
  labels!: string[];
  points!: TimeSeriesPointDetails[];
}
