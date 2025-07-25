import { TimeSeriesDetails, TimeSeriesDetailsSummaryEnum } from "src/api";

import { ChartConfig } from "./chart.config";

export const getSummaryDate = (
  date: Date,
  summary: TimeSeriesDetailsSummaryEnum,
): string => {
  switch (summary) {
    case TimeSeriesDetailsSummaryEnum.Total: {
      return "";
    }
    case TimeSeriesDetailsSummaryEnum.Yearly: {
      return date.toJSON().slice(0, 4);
    }
    case TimeSeriesDetailsSummaryEnum.Monthly: {
      return date.toJSON().slice(0, 7);
    }
    case TimeSeriesDetailsSummaryEnum.Weekly: {
      throw new Error("Not supported yet");
    }
    case TimeSeriesDetailsSummaryEnum.DayOfWeek: {
      throw new Error("Not supported yet");
    }
    case TimeSeriesDetailsSummaryEnum.Daily: {
      return date.toJSON().slice(0, 10);
    }
    case TimeSeriesDetailsSummaryEnum.Hourly: {
      return date.toJSON().slice(0, 13);
    }
  }
};

interface TimeSeriesStat {
  label: string;
  value: number;
}

const getSummaryValues = (timeSeries: TimeSeriesDetails): TimeSeriesStat[] => {
  const labelTotal: Record<string, TimeSeriesStat> = {};

  const currentPeriod = getSummaryDate(new Date(), timeSeries.summary);

  for (const point of timeSeries.points) {
    if (!point.createdAt.startsWith(currentPeriod)) {
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
  return getSummaryValues(timeSeries);
};

export const getChartData = (
  timeSeries: TimeSeriesDetails,
  config: ChartConfig,
) => {
  const data: Record<string, Record<string, number>> = {};

  for (const point of timeSeries.points) {
    const groupKey = config.getGroupKey(new Date(point.createdAt));

    if (!(groupKey in data)) {
      data[groupKey] = {};
    }

    const label = point.label;

    if (label in data[groupKey]) {
      data[groupKey][label] += point.value;
    } else {
      data[groupKey][label] = point.value;
    }
  }

  const defaultPoints = Object.fromEntries(
    timeSeries.labels.map((label) => [label, 0]),
  );

  const entries = Object.entries(data).map(([groupKey, data]) => ({
    ...defaultPoints,
    ...data,
    date: config.getValue(groupKey),
  }));

  if (config.sortCompareFn) {
    entries.sort((a, b) => config.sortCompareFn!(a.date, b.date));
  }

  return entries;
};
