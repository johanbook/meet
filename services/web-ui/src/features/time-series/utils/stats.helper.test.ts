import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TimeSeriesDetailsSummaryEnum } from "src/api";

import { getSummaryDate } from "./stats.helper";

describe("getSummaryDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime("2000-01-01");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it.skip("should return the correct date for Hourly aggregation", () => {
    const result = getSummaryDate(
      new Date(),
      TimeSeriesDetailsSummaryEnum.Hourly,
    );
    expect(result).toBe("2000-01-01T01");
  });
});
