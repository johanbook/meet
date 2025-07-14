import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";

export const getAggregationDate = (
  aggregation: TimeSeriesDetailsAggregationEnum,
): string => {
  switch (aggregation) {
    case TimeSeriesDetailsAggregationEnum.Total: {
      return "";
    }
    case TimeSeriesDetailsAggregationEnum.Yearly: {
      return new Date().toJSON().slice(0, 4);
    }
    case TimeSeriesDetailsAggregationEnum.Monthly: {
      return new Date().toJSON().slice(0, 7);
    }
    case TimeSeriesDetailsAggregationEnum.Weekly: {
      throw new Error("Not yet supported");
    }
    case TimeSeriesDetailsAggregationEnum.Daily: {
      return new Date().toJSON().slice(0, 10);
    }
    case TimeSeriesDetailsAggregationEnum.Hourly: {
      return new Date().toJSON().slice(0, 13);
    }
    default: {
      return new Date().toJSON().slice(0, 7);
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

  const currentMonth = getAggregationDate(timeSeries.aggregation);

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

interface PlotPoint {
  id: string;
  x: number;
  y: number;
}

export const getChartData = (timeSeries: TimeSeriesDetails) => {
  const data: Record<string, PlotPoint[]> = {};

  for (const point of timeSeries.points) {
    const value = {
      id: point.id,
      x: new Date(point.createdAt).valueOf(),
      y: point.value,
    };

    if (point.label in data) {
      data[point.label].push(value);
    } else {
      data[point.label] = [value];
    }
  }

  return data;
};
