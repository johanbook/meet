import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";

export const getAggregationDate = (
  date: Date,
  aggregation: TimeSeriesDetailsAggregationEnum,
): string => {
  switch (aggregation) {
    case TimeSeriesDetailsAggregationEnum.Total: {
      return "";
    }
    case TimeSeriesDetailsAggregationEnum.Yearly: {
      return date.toJSON().slice(0, 4);
    }
    case TimeSeriesDetailsAggregationEnum.Monthly: {
      return date.toJSON().slice(0, 7);
    }
    case TimeSeriesDetailsAggregationEnum.Weekly: {
      throw new Error("Not yet supported");
    }
    case TimeSeriesDetailsAggregationEnum.Daily: {
      return date.toJSON().slice(0, 10);
    }
    case TimeSeriesDetailsAggregationEnum.Hourly: {
      return date.toJSON().slice(0, 13);
    }
    default: {
      return date.toJSON().slice(0, 7);
    }
  }
};

interface TimeSeriesStat {
  label: string;
  value: number;
}

const getAggregatedValues = (
  timeSeries: TimeSeriesDetails,
): TimeSeriesStat[] => {
  const labelTotal: Record<string, TimeSeriesStat> = {};

  const currentMonth = getAggregationDate(new Date(), timeSeries.aggregation);

  for (const point of timeSeries.points) {
    if (!point.createdAt.startsWith(currentMonth)) {
      continue;
    }

    const { label, value } = point;

    if (label in labelTotal) {
      labelTotal[label].value += value;
    } else {
      labelTotal[label] = {
        label: `${label} (${timeSeries.aggregation})`,
        value,
      };
    }
  }

  return Object.values(labelTotal);
};

export const getTimeSeriesStats = (
  timeSeries: TimeSeriesDetails,
): TimeSeriesStat[] => {
  return getAggregatedValues(timeSeries);
};

export const getAggregatedData = (
  timeSeries: TimeSeriesDetails,
  aggregation: TimeSeriesDetailsAggregationEnum,
) => {
  const data: Record<string, Record<string, number>> = {};

  for (const point of timeSeries.points) {
    const aggregatedDate = getAggregationDate(
      new Date(point.createdAt),
      aggregation,
    );

    if (!(aggregatedDate in data)) {
      data[aggregatedDate] = {};
    }

    const label = point.label;

    if (label in data[aggregatedDate]) {
      data[aggregatedDate][label] += point.value;
    } else {
      data[aggregatedDate][label] = point.value;
    }
  }

  const entries = Object.entries(data).map(([date, data]) => ({
    ...data,
    date,
  }));

  return entries.sort((a, b) => a.date.localeCompare(b.date));
};
