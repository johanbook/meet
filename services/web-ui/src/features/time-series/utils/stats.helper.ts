import {
  TimeSeriesDetails,
  TimeSeriesDetailsSummaryEnum,
  TimeSeriesPointDetails,
} from "src/api";

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

const DAY_IN_MS = 86_400_000;
const MAX_CADENCE_INTERVALS = 6;

/** Calendar day number (days since Unix epoch, local calendar) for an instant. */
const getCalendarDayNumber = (date: Date): number => {
  const startOfDay = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  return Math.floor(startOfDay / DAY_IN_MS);
};

export interface CadenceStats {
  /** Date of the most recent point; undefined when there are no points. */
  lastEventDate: Date | undefined;
  /** Whole calendar days since the last point; undefined when there are no points. */
  daysSinceLastEvent: number | undefined;
  /** Mean gap in days between consecutive points; undefined with fewer than two points. */
  averageIntervalDays: number | undefined;
  /** Shortest sampled gap in days; undefined with fewer than two points. */
  shortestIntervalDays: number | undefined;
  /** Longest sampled gap in days; undefined with fewer than two points. */
  longestIntervalDays: number | undefined;
  /** Last point plus the average interval; undefined with fewer than two points. */
  nextExpectedDate: Date | undefined;
  /** Calendar days until the projected next event; negative when overdue. */
  daysUntilNextExpected: number | undefined;
}

/**
 * Statistics about the cadence of event points, e.g. the gap between
 * consecutive logged events. Interval stats cover the most recent
 * {@link MAX_CADENCE_INTERVALS} gaps.
 */
export const getCadenceStats = (
  points: TimeSeriesPointDetails[],
): CadenceStats => {
  if (points.length === 0) {
    return {
      lastEventDate: undefined,
      daysSinceLastEvent: undefined,
      averageIntervalDays: undefined,
      shortestIntervalDays: undefined,
      longestIntervalDays: undefined,
      nextExpectedDate: undefined,
      daysUntilNextExpected: undefined,
    };
  }

  const dates = points
    .map((point) => new Date(point.createdAt))
    .toSorted((a, b) => a.valueOf() - b.valueOf());

  const lastEventDate = dates.at(-1)!;
  const today = new Date();
  const daysSinceLastEvent = Math.max(
    0,
    getCalendarDayNumber(today) - getCalendarDayNumber(lastEventDate),
  );

  if (dates.length < 2) {
    return {
      lastEventDate,
      daysSinceLastEvent,
      averageIntervalDays: undefined,
      shortestIntervalDays: undefined,
      longestIntervalDays: undefined,
      nextExpectedDate: undefined,
      daysUntilNextExpected: undefined,
    };
  }

  const intervals: number[] = [];

  for (let index = 1; index < dates.length; index++) {
    intervals.push(
      Math.max(
        0,
        getCalendarDayNumber(dates[index]) -
          getCalendarDayNumber(dates[index - 1]),
      ),
    );
  }

  const sampledIntervals = intervals.slice(-MAX_CADENCE_INTERVALS);
  const averageIntervalDays =
    sampledIntervals.reduce((sum, interval) => sum + interval, 0) /
    sampledIntervals.length;

  const nextExpectedDate = new Date(
    lastEventDate.valueOf() + averageIntervalDays * DAY_IN_MS,
  );

  return {
    lastEventDate,
    daysSinceLastEvent,
    averageIntervalDays,
    shortestIntervalDays: Math.min(...sampledIntervals),
    longestIntervalDays: Math.max(...sampledIntervals),
    nextExpectedDate,
    daysUntilNextExpected:
      getCalendarDayNumber(nextExpectedDate) - getCalendarDayNumber(today),
  };
};
