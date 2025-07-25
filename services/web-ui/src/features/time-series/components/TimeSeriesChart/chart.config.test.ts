import dayjs from "dayjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TimeSeriesDetailsAggregationEnum } from "src/api";

import { CHART_CONFIGS } from "./chart.config";

interface TestProps {
  date: string;
  key: string;
  label: string;
  value: number | string;
}

const VALUE = 1_577_836_800_000;

const TESTS: Record<TimeSeriesDetailsAggregationEnum, TestProps> = {
  [TimeSeriesDetailsAggregationEnum.Yearly]: {
    date: "2020-01-01T00:00:00Z",
    key: "2020",
    label: "2020",
    value: "2020",
  },
  [TimeSeriesDetailsAggregationEnum.Monthly]: {
    date: "2020-01-01T00:00:00Z",
    key: "2020-01",
    label: "Jan",
    value: VALUE,
  },
  [TimeSeriesDetailsAggregationEnum.Weekly]: {
    date: "2020-01-01T00:00:00Z",
    key: "2020-W1",
    label: "1",
    value: 1_577_836_800_000,
  },
  [TimeSeriesDetailsAggregationEnum.DayOfWeek]: {
    date: "2020-01-01T00:00:00Z",
    key: "3",
    label: "Thursday",
    value: "3",
  },
  [TimeSeriesDetailsAggregationEnum.Daily]: {
    date: "2020-01-01T00:00:00Z",
    key: "2020-01-01",
    label: "2020-01-01",
    value: VALUE,
  },
  [TimeSeriesDetailsAggregationEnum.Hourly]: {
    date: dayjs("2020-01-01T06:00:00").format(),
    key: "2000-01-01T06:00",
    label: "06:00",
    value: dayjs("2000-01-01T06:00").valueOf(),
  },
};

describe("Time Series Chart Configs", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime("2000-01-01");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(Object.entries(TESTS))("%s", (aggregation, props) => {
    const config =
      CHART_CONFIGS[aggregation as TimeSeriesDetailsAggregationEnum];

    const key = config.getGroupKey(dayjs(props.date).toDate());
    expect(key).toBe(props.key);

    const value = config.getValue(key);
    expect(value).toBe(props.value);

    const label = config.getLabel(props.date);
    expect(label).toBe(props.label);
  });
});
