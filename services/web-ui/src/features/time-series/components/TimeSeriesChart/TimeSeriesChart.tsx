import { ReactElement, useMemo, useState } from "react";

import { MenuItem, alpha, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";
import { Select } from "src/components/ui";

import { getAggregatedData } from "../../utils/stats.helper";

const SERIES_OPTIONS = {
  area: true,
  showMark: false,
};

interface TimeSeriesChartProps {
  timeSeries: TimeSeriesDetails;
}

export function TimeSeriesChart({
  timeSeries,
}: TimeSeriesChartProps): ReactElement {
  const [aggregation, setAggregation] =
    useState<TimeSeriesDetailsAggregationEnum>(
      TimeSeriesDetailsAggregationEnum.Daily,
    );

  const data = useMemo(
    () => getAggregatedData(timeSeries, aggregation),
    [aggregation, timeSeries],
  );

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

  return (
    <>
      <Select
        onChange={(value) =>
          setAggregation(value as TimeSeriesDetailsAggregationEnum)
        }
        value={aggregation}
      >
        {Object.entries(TimeSeriesDetailsAggregationEnum).map(
          ([name, value]) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ),
        )}
      </Select>

      <LineChart
        dataset={data}
        height={300}
        series={timeSeries.labels.map((label) => ({
          ...SERIES_OPTIONS,
          color: getColor(label),
          dataKey: label,
          label,
        }))}
        xAxis={[{ dataKey: "date", scaleType: "time" }]}
      />
    </>
  );
}
