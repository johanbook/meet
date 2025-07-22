import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TimeSeriesDetailsAggregationEnum } from "src/api";

import { getAggregationDate } from "./stats.helper";

describe("getAggregationDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime("2000-01-01");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the correct date for Total aggregation", () => {
    const result = getAggregationDate(
      new Date(),
      TimeSeriesDetailsAggregationEnum.Total,
    );
    expect(result.value).toBe("");
  });

  it("should return the correct date for Yearly aggregation", () => {
    const result = getAggregationDate(
      new Date(),
      TimeSeriesDetailsAggregationEnum.Yearly,
    );
    expect(result.value).toBe("2000");
  });

  it("should return the correct date for Monthly aggregation", () => {
    const result = getAggregationDate(
      new Date(),
      TimeSeriesDetailsAggregationEnum.Monthly,
    );
    expect(result.value).toBe("2000-01");
  });

  it("should return the correct date for Daily aggregation", () => {
    const result = getAggregationDate(
      new Date(),
      TimeSeriesDetailsAggregationEnum.Daily,
    );
    expect(result.value).toBe("2000-01-01");
  });

  // TODO: Fix test
  it.skip("should return the correct date for Hourly aggregation", () => {
    const result = getAggregationDate(
      new Date(),
      TimeSeriesDetailsAggregationEnum.Hourly,
    );
    expect(result.value).toBe("2000-01-01T01:00");
  });
});
