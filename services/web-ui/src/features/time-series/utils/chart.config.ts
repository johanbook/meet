import dayjs from "dayjs";

import { TimeSeriesDetailsAggregationEnum } from "src/api";
import { getWeek, getWeekDay } from "src/utils/time";

export interface ChartConfig {
  scaleType: "band" | "time";
  getGroupKey: (date: Date) => string;
  getLabel: (groupKey: string) => string;
  getValue: (value: string) => string | number;
  sortCompareFn?: (a: string | number, b: string | number) => number;
}

export const CHART_CONFIGS: Record<
  TimeSeriesDetailsAggregationEnum,
  ChartConfig
> = {
  [TimeSeriesDetailsAggregationEnum.Yearly]: {
    scaleType: "band",
    getGroupKey: (date) => date.getFullYear().toString(),
    getLabel: (key) => dayjs(key).format("YYYY"),
    getValue: (value) => value,
  },
  [TimeSeriesDetailsAggregationEnum.Monthly]: {
    scaleType: "time",
    getGroupKey: (date) => dayjs(date).format("YYYY-MM"),
    getLabel: (key) => dayjs(key).format("MMM"),
    getValue: (value) => new Date(value).valueOf(),
  },
  [TimeSeriesDetailsAggregationEnum.Weekly]: {
    scaleType: "time",
    getGroupKey: (date) => {
      const year = date.getFullYear();
      const week = getWeek(date);
      return `${year}-W${week}`;
    },
    getLabel: (date) => {
      return String(dayjs(date).week());
    },
    getValue: (value) => {
      const [year, week] = value.split("-W");
      const date = dayjs.utc(year).week(Number(week));
      return date.valueOf();
    },
  },
  [TimeSeriesDetailsAggregationEnum.DayOfWeek]: {
    scaleType: "band",
    getGroupKey: (date) => dayjs(date).isoWeekday().toString(),
    getLabel: (key) => getWeekDay(dayjs().isoWeekday(Number.parseInt(key))),
    getValue: (value) => value,
    sortCompareFn: (a, b) => Number(a) - Number(b),
  },
  [TimeSeriesDetailsAggregationEnum.Daily]: {
    scaleType: "time",
    getGroupKey: (date) => dayjs(date).format("YYYY-MM-DD"),
    getLabel: (key) => dayjs(key).format("YYYY-MM-DD"),
    getValue: (value) => new Date(value).valueOf(),
  },
  [TimeSeriesDetailsAggregationEnum.Hourly]: {
    scaleType: "time",
    // We use a fixed date here to coerce all hours into one day
    getGroupKey: (date) => dayjs.utc(date).format("2000-01-01THH:00Z"),
    getLabel: (key) => dayjs.utc(key).format("HH:00"),
    getValue: (value) => new Date(value).valueOf(),
    sortCompareFn: (a, b) => new Date(a).valueOf() - new Date(b).valueOf(),
  },
};
