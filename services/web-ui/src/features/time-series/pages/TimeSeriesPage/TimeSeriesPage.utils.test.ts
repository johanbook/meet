import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TimeSeriesDetailsAggregationEnum } from "src/api";

import { getAggregationDate } from "./TimeSeriesPage.utils";

describe("getAggregationDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime("2000-01-01");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the correct date for Total aggregation", () => {
    const result = getAggregationDate(TimeSeriesDetailsAggregationEnum.Total);
    expect(result).toBe("");
  });

  it("should return the correct date for Yearly aggregation", () => {
    const result = getAggregationDate(TimeSeriesDetailsAggregationEnum.Yearly);
    expect(result).toBe("2000");
  });

  it("should return the correct date for Monthly aggregation", () => {
    const result = getAggregationDate(TimeSeriesDetailsAggregationEnum.Monthly);
    expect(result).toBe("2000-01");
  });

  it("should return the correct date for Daily aggregation", () => {
    const result = getAggregationDate(TimeSeriesDetailsAggregationEnum.Daily);
    expect(result).toBe("2000-01-01");
  });

  it("should return the correct date for Hourly aggregation", () => {
    const result = getAggregationDate(TimeSeriesDetailsAggregationEnum.Hourly);
    expect(result).toBe("2000-01-01T00");
  });
});
