import { TimeSeriesDetails } from "src/api";

import { ChartConfig } from "./chart.config";

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
