import { TimeSeriesDetails, TimeSeriesDetailsSummaryEnum } from "src/api";

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
