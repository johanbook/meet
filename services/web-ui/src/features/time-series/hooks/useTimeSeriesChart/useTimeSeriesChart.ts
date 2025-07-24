import { useMemo } from "react";

import { alpha, useTheme } from "@mui/material";
import dayjs from "dayjs";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";
import { getWeek, getWeekDay } from "src/utils/time";

const SERIES_OPTIONS = {
  area: true,
  showMark: false,
};

export const getAggregationDate = (
  date: Date,
  aggregation: TimeSeriesDetailsAggregationEnum,
): { label: string; value: string } => {
  switch (aggregation) {
    case TimeSeriesDetailsAggregationEnum.Total: {
      return { label: "Total", value: "" };
    }
    case TimeSeriesDetailsAggregationEnum.Yearly: {
      const year = date.toJSON().slice(0, 4);
      return { label: year, value: year };
    }
    case TimeSeriesDetailsAggregationEnum.Monthly: {
      const month = date.toJSON().slice(0, 7);
      const x = dayjs(month).format("MMM");
      return { label: x, value: month };
    }
    case TimeSeriesDetailsAggregationEnum.Weekly: {
      const week = getWeek(date);
      const currentYear = date.toJSON().slice(0, 4);
      const newDate = dayjs(currentYear).week(week);
      return { label: String(week), value: newDate.toJSON() };
    }
    case TimeSeriesDetailsAggregationEnum.DayOfWeek: {
      const label = getWeekDay(date);
      const weekdayIndex = dayjs(date).day();
      const referenceSunday = dayjs("2020-01-05");
      const weekdayDate = referenceSunday.add(weekdayIndex, "day");
      return { label, value: weekdayDate.toJSON() };
    }
    case TimeSeriesDetailsAggregationEnum.Daily: {
      const day = date.toJSON().slice(0, 10);
      return { label: day, value: day };
    }
    case TimeSeriesDetailsAggregationEnum.Hourly: {
      const hour = dayjs(date).format("HH:00");
      const now = dayjs().format("YYYY-MM-DD");
      return { label: hour, value: `${now}T${hour}` };
    }
  }
};

const getAggregatedData = (
  timeSeries: TimeSeriesDetails,
  aggregation: TimeSeriesDetailsAggregationEnum,
) => {
  const data: Record<string, Record<string, number>> = {};

  for (const point of timeSeries.points) {
    const aggregatedDate = getAggregationDate(
      new Date(point.createdAt),
      aggregation,
    ).value;

    if (!(aggregatedDate in data)) {
      data[aggregatedDate] = {};
    }

    const label = point.label;

    if (label in data[aggregatedDate]) {
      data[aggregatedDate][label] += point.value;
    } else {
      data[aggregatedDate][label] = point.value;
    }
  }

  const defaultPoints = Object.fromEntries(
    timeSeries.labels.map((label) => [label, 0]),
  );

  const entries = Object.entries(data).map(([date, data]) => ({
    ...defaultPoints,
    ...data,
    date,
  }));

  return entries.sort((a, b) => (a.date > b.date ? 1 : -1));
};

interface UseTimeSeriesChartReturn {
  dataset: Record<string, any>[];
  series: any[];
  xAxis: any;
}

export function useTimeSeriesChart(
  timeSeries: TimeSeriesDetails,
  aggregation: TimeSeriesDetailsAggregationEnum,
): UseTimeSeriesChartReturn {
  const theme = useTheme();

  function getColor(label: string): string {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ];
    const index = timeSeries.labels.indexOf(label);

    return alpha(colors[index % colors.length], 0.4);
  }

  return useMemo(() => {
    const scaleType =
      aggregation === TimeSeriesDetailsAggregationEnum.Yearly ||
      aggregation === TimeSeriesDetailsAggregationEnum.DayOfWeek
        ? "band"
        : "time";

    const data = getAggregatedData(timeSeries, aggregation);

    const dataset = data.map((entry) => ({
      ...entry,
      date:
        scaleType === "band"
          ? getAggregationDate(new Date(entry.date), aggregation).label
          : new Date(entry.date).valueOf(),
    }));

    const series = timeSeries.labels.map((label) => ({
      ...SERIES_OPTIONS,
      color: getColor(label),
      dataKey: label,
      label,
    }));

    const xAxis = {
      dataKey: "date",
      scaleType: scaleType,
      valueFormatter: (value: any) => {
        if (scaleType === "band") {
          return value;
        }

        const date = new Date(value);
        const { label } = getAggregationDate(date, aggregation);
        return label;
      },
    };

    return { dataset, series, xAxis };
  }, [timeSeries, aggregation]);
}
