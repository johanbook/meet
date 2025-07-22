import dayjs from "dayjs";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";
import { getWeek } from "src/utils/time";

export const getAggregationDate = (
  date: Date,
  aggregation: TimeSeriesDetailsAggregationEnum,
): { label: string; value: string } => {
  switch (aggregation) {
    case TimeSeriesDetailsAggregationEnum.Total: {
      return { label: "Total", value: "" };
    }
    case TimeSeriesDetailsAggregationEnum.Yearly: {
      const year = date.toJSON().slice(0, 4);
      return { label: year, value: year };
    }
    case TimeSeriesDetailsAggregationEnum.Monthly: {
      const month = date.toJSON().slice(0, 7);
      return { label: month, value: month };
    }
    case TimeSeriesDetailsAggregationEnum.Weekly: {
      const week = getWeek(date);
      const year = date.toJSON().slice(0, 4);
      const label = `${year} W${week}`;
      const newDate = dayjs(year).week(week);
      return { label, value: newDate.toJSON() };
    }
    case TimeSeriesDetailsAggregationEnum.Daily: {
      const day = date.toJSON().slice(0, 10);
      return { label: day, value: day };
    }
    case TimeSeriesDetailsAggregationEnum.Hourly: {
      const hour = date.toJSON().slice(0, 13);
      return { label: hour, value: hour };
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

  const currentMonth = getAggregationDate(
    new Date(),
    timeSeries.aggregation,
  ).value;

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
    ).value;

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

  const defaultPoints = Object.fromEntries(
    timeSeries.labels.map((label) => [label, 0]),
  );

  const entries = Object.entries(data).map(([date, data]) => ({
    ...defaultPoints,
    ...data,
    date: new Date(date).valueOf(),
  }));

  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
};
