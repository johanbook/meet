import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  TimeSeriesDetails,
  TimeSeriesDetailsAggregationEnum,
  TimeSeriesDetailsSummaryEnum,
  TimeSeriesPointDetails,
} from "src/api";

import {
  getCadenceStats,
  getPreviousSummaryDate,
  getSummaryDate,
  getTimeSeriesStats,
} from "./stats.helper";

const NOW = "2000-01-01";

const createPoint = (
  label: string,
  createdAt: string,
  value: number,
): TimeSeriesPointDetails => ({
  createdAt,
  description: "",
  id: label,
  label,
  value,
});

const createTimeSeries = (
  summary: TimeSeriesDetailsSummaryEnum,
  points: TimeSeriesPointDetails[] = [],
): TimeSeriesDetails => ({
  id: "my-id",
  name: "my-name",
  description: "my-description",
  createdAt: "",
  aggregation: TimeSeriesDetailsAggregationEnum.Daily,
  summary,
  labels: ["Cost", "Revenue"],
  points,
});

describe("stats.helper", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe(getSummaryDate.name, () => {
    it("should return the correct date for Total aggregation", () => {
      const result = getSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Total,
      );
      expect(result).toBe("");
    });

    it("should return the correct date for Yearly aggregation", () => {
      const result = getSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Yearly,
      );
      expect(result).toBe("2000");
    });

    it("should return the correct date for Monthly aggregation", () => {
      const result = getSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Monthly,
      );
      expect(result).toBe("2000-01");
    });

    it("should return the correct date for Daily aggregation", () => {
      const result = getSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Daily,
      );
      expect(result).toBe("2000-01-01");
    });

    it("should return the correct date for Hourly aggregation", () => {
      const result = getSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Hourly,
      );
      expect(result).toBe("2000-01-01T00");
    });
  });

  describe(getPreviousSummaryDate.name, () => {
    it("returns an empty period for Total aggregation", () => {
      const result = getPreviousSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Total,
      );
      expect(result).toBe("");
    });

    it("returns the previous year", () => {
      const result = getPreviousSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Yearly,
      );
      expect(result).toBe("1999");
    });

    it("returns the previous month across a year boundary", () => {
      const result = getPreviousSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Monthly,
      );
      expect(result).toBe("1999-12");
    });

    it("returns the previous day across a month boundary", () => {
      const result = getPreviousSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Daily,
      );
      expect(result).toBe("1999-12-31");
    });

    it("returns the previous hour across a day boundary", () => {
      const result = getPreviousSummaryDate(
        new Date(),
        TimeSeriesDetailsSummaryEnum.Hourly,
      );
      expect(result).toBe("1999-12-31T23");
    });
  });

  describe(getTimeSeriesStats.name, () => {
    it("zero-fills labels without points in the current period", () => {
      const timeSeries = createTimeSeries(TimeSeriesDetailsSummaryEnum.Daily, [
        createPoint("Cost", "2000-01-01T09:00", 4),
      ]);

      const { stats, windowLabel, previousWindowLabel } =
        getTimeSeriesStats(timeSeries);

      expect(stats).toEqual([
        { label: "Cost", value: 4, previousValue: undefined },
        { label: "Revenue", value: 0, previousValue: undefined },
      ]);
      expect(windowLabel).toBe("today");
      expect(previousWindowLabel).toBe("yesterday");
    });

    it("flags the current and previous period totals per label", () => {
      const timeSeries = createTimeSeries(TimeSeriesDetailsSummaryEnum.Daily, [
        createPoint("Revenue", "2000-01-01T09:00", 5),
        createPoint("Revenue", "2000-01-01T18:00", 2),
        createPoint("Revenue", "1999-12-31T20:00", 3),
        createPoint("Cost", "2000-01-01T10:00", 4),
        createPoint("Cost", "1999-12-31T10:00", 1),
      ]);

      const { stats } = getTimeSeriesStats(timeSeries);

      expect(stats).toEqual([
        { label: "Cost", value: 4, previousValue: 1 },
        { label: "Revenue", value: 7, previousValue: 3 },
      ]);
    });

    it("ignores points outside the current and previous periods", () => {
      const timeSeries = createTimeSeries(TimeSeriesDetailsSummaryEnum.Daily, [
        createPoint("Revenue", "1999-12-30T09:00", 100),
        createPoint("Revenue", "2000-01-02T09:00", 100),
      ]);

      const { stats } = getTimeSeriesStats(timeSeries);

      expect(stats).toEqual([
        { label: "Cost", value: 0, previousValue: undefined },
        { label: "Revenue", value: 0, previousValue: undefined },
      ]);
    });

    it("sums all points and reports no comparison for Total aggregation", () => {
      const timeSeries = createTimeSeries(TimeSeriesDetailsSummaryEnum.Total, [
        createPoint("Revenue", "1999-12-30T09:00", 5),
        createPoint("Revenue", "2000-01-02T09:00", 7),
      ]);

      const { stats, windowLabel, previousWindowLabel } =
        getTimeSeriesStats(timeSeries);

      expect(stats).toEqual([
        { label: "Cost", value: 0, previousValue: undefined },
        { label: "Revenue", value: 12, previousValue: undefined },
      ]);
      expect(windowLabel).toBe("all time");
      expect(previousWindowLabel).toBe("");
    });
  });

  describe(getCadenceStats.name, () => {
    it("returns undefined stats when there are no points", () => {
      expect(getCadenceStats([])).toEqual({
        lastEventDate: undefined,
        daysSinceLastEvent: undefined,
        averageIntervalDays: undefined,
        shortestIntervalDays: undefined,
        longestIntervalDays: undefined,
        nextExpectedDate: undefined,
        daysUntilNextExpected: undefined,
      });
    });

    it("reports the last event and days since it for a single point", () => {
      const cadence = getCadenceStats([
        createPoint("Cost", "1999-12-31T23:00", 1),
      ]);

      expect(cadence.lastEventDate).toEqual(new Date("1999-12-31T23:00"));
      expect(cadence.daysSinceLastEvent).toBe(1);
      expect(cadence.averageIntervalDays).toBeUndefined();
      expect(cadence.nextExpectedDate).toBeUndefined();
    });

    it("computes interval stats and the next expected event", () => {
      const cadence = getCadenceStats([
        createPoint("Cost", "1999-12-01T08:00", 1),
        createPoint("Cost", "1999-12-29T08:00", 1),
      ]);

      expect(cadence.averageIntervalDays).toBe(28);
      expect(cadence.shortestIntervalDays).toBe(28);
      expect(cadence.longestIntervalDays).toBe(28);
      expect(cadence.nextExpectedDate).toEqual(
        new Date(new Date("1999-12-29T08:00").valueOf() + 28 * 86_400_000),
      );
      expect(cadence.daysUntilNextExpected).toBe(25);
    });

    it("sorts points chronologically", () => {
      const cadence = getCadenceStats([
        createPoint("Cost", "1999-12-29T08:00", 1),
        createPoint("Cost", "1999-12-01T08:00", 1),
      ]);

      expect(cadence.lastEventDate).toEqual(new Date("1999-12-29T08:00"));
      expect(cadence.averageIntervalDays).toBe(28);
    });

    it("samples the most recent intervals", () => {
      const cadence = getCadenceStats([
        createPoint("Cost", "1998-01-01T00:00", 1),
        createPoint("Cost", "2000-09-27T00:00", 1),
        createPoint("Cost", "2000-10-07T00:00", 1),
        createPoint("Cost", "2000-10-17T00:00", 1),
        createPoint("Cost", "2000-10-27T00:00", 1),
        createPoint("Cost", "2000-11-06T00:00", 1),
        createPoint("Cost", "2000-11-16T00:00", 1),
        createPoint("Cost", "2000-11-26T00:00", 1),
        createPoint("Cost", "2000-12-06T00:00", 1),
      ]);

      expect(cadence.averageIntervalDays).toBe(10);
      expect(cadence.shortestIntervalDays).toBe(10);
      expect(cadence.longestIntervalDays).toBe(10);
    });

    it("reports an overdue next expected event", () => {
      const cadence = getCadenceStats([
        createPoint("Cost", "1999-01-01T00:00", 1),
        createPoint("Cost", "1999-02-01T00:00", 1),
      ]);

      expect(cadence.daysUntilNextExpected).toBe(-303);
    });
  });
});
