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

const WINDOW_LABELS: Record<
  TimeSeriesDetailsSummaryEnum,
  { current: string; previous: string }
> = {
  [TimeSeriesDetailsSummaryEnum.Total]: {
    current: "all time",
    previous: "",
  },
  [TimeSeriesDetailsSummaryEnum.Yearly]: {
    current: "this year",
    previous: "last year",
  },
  [TimeSeriesDetailsSummaryEnum.Monthly]: {
    current: "this month",
    previous: "last month",
  },
  [TimeSeriesDetailsSummaryEnum.Weekly]: {
    current: "this week",
    previous: "last week",
  },
  [TimeSeriesDetailsSummaryEnum.DayOfWeek]: {
    current: "this day",
    previous: "last week",
  },
  [TimeSeriesDetailsSummaryEnum.Daily]: {
    current: "today",
    previous: "yesterday",
  },
  [TimeSeriesDetailsSummaryEnum.Hourly]: {
    current: "this hour",
    previous: "last hour",
  },
};

export const getPreviousSummaryDate = (
  date: Date,
  summary: TimeSeriesDetailsSummaryEnum,
): string => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  switch (summary) {
    case TimeSeriesDetailsSummaryEnum.Total: {
      return "";
    }
    case TimeSeriesDetailsSummaryEnum.Yearly: {
      return getSummaryDate(new Date(Date.UTC(year - 1, month, day)), summary);
    }
    case TimeSeriesDetailsSummaryEnum.Monthly: {
      return getSummaryDate(new Date(Date.UTC(year, month - 1, 1)), summary);
    }
    case TimeSeriesDetailsSummaryEnum.Weekly: {
      throw new Error("Not supported yet");
    }
    case TimeSeriesDetailsSummaryEnum.DayOfWeek: {
      throw new Error("Not supported yet");
    }
    case TimeSeriesDetailsSummaryEnum.Daily: {
      return getSummaryDate(new Date(Date.UTC(year, month, day - 1)), summary);
    }
    case TimeSeriesDetailsSummaryEnum.Hourly: {
      return getSummaryDate(
        new Date(Date.UTC(year, month, day, date.getUTCHours() - 1)),
        summary,
      );
    }
  }
};

export interface TimeSeriesStat {
  label: string;
  /** Sum of points in the current period. */
  value: number;
  /** Sum of points in the previous period; undefined when there is no comparison basis. */
  previousValue: number | undefined;
}

export interface TimeSeriesStats {
  stats: TimeSeriesStat[];
  /** Human-readable label of the current period, e.g. "today". */
  windowLabel: string;
  /** Human-readable label of the previous period, e.g. "yesterday". */
  previousWindowLabel: string;
}

export const getTimeSeriesStats = (
  timeSeries: TimeSeriesDetails,
): TimeSeriesStats => {
  const summary = timeSeries.summary;
  const currentDate = new Date();

  const currentPeriod = getSummaryDate(currentDate, summary);
  const previousPeriod = getPreviousSummaryDate(currentDate, summary);

  const currentTotals: Record<string, number> = {};
  const previousTotals: Record<string, number> = {};
  const previousHasPoints: Record<string, boolean> = {};

  for (const point of timeSeries.points) {
    const { label, value } = point;

    if (point.createdAt.startsWith(currentPeriod)) {
      currentTotals[label] = (currentTotals[label] ?? 0) + value;
    } else if (point.createdAt.startsWith(previousPeriod)) {
      previousTotals[label] = (previousTotals[label] ?? 0) + value;
      previousHasPoints[label] = true;
    }
  }

  const stats: TimeSeriesStat[] = timeSeries.labels
    .map((label) => ({
      label,
      value: currentTotals[label] ?? 0,
      previousValue: previousHasPoints[label]
        ? previousTotals[label]
        : undefined,
    }))
    .toSorted((a, b) => a.label.localeCompare(b.label));

  return {
    stats,
    windowLabel: WINDOW_LABELS[summary].current,
    previousWindowLabel: WINDOW_LABELS[summary].previous,
  };
};
