import { describe, expect, it } from "vitest";

import {
  TimeSeriesDetails,
  TimeSeriesDetailsAggregationEnum,
  TimeSeriesDetailsSummaryEnum,
  TimeSeriesPointDetails,
} from "src/api";

import { CHART_CONFIGS } from "./chart.config";
import { getChartData } from "./stats.helper";

const TIME_SERIES: TimeSeriesDetails = {
  id: "my-id",
  name: "my-name",
  description: "my-description",
  createdAt: "",
  aggregation: TimeSeriesDetailsAggregationEnum.Daily,
  summary: TimeSeriesDetailsSummaryEnum.Daily,
  labels: [],
  points: [],
};

describe(getChartData.name, () => {
  it("handles day of week", () => {
    const points: TimeSeriesPointDetails[] = [
      {
        createdAt: "2025-07-21T07:00", // Monday
        description: "",
        id: "",
        label: "Test",
        value: 1,
      },
      {
        createdAt: "2025-07-26T16:00", // Saturday
        description: "",
        id: "",
        label: "Test",
        value: 1,
      },
      {
        createdAt: "2025-07-26T18:00", // Saturday
        description: "",
        id: "",
        label: "Test",
        value: 1,
      },
      {
        createdAt: "2025-07-27T19:00", // Sunday
        description: "",
        id: "",
        label: "Test",
        value: 1,
      },
    ];

    const dateRange = { to: new Date(), from: new Date() };

    const data = getChartData(
      { ...TIME_SERIES, points },
      CHART_CONFIGS.dayOfWeek,
      dateRange,
    );

    expect(data).toEqual([
      {
        Test: 1,
        date: "1", // Monday in ISO week day
      },
      {
        Test: 2,
        date: "6", // Saturday in ISO week day
      },
      {
        Test: 1,
        date: "7", // Sunday in ISO week day
      },
    ]);
  });
});
