import { ReactElement, useMemo } from "react";

import { LineChart } from "@mui/x-charts";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";

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
  const data = useMemo(
    () => getAggregatedData(timeSeries, TimeSeriesDetailsAggregationEnum.Daily),
    [timeSeries],
  );

  return (
    <LineChart
      dataset={data}
      height={300}
      series={timeSeries.labels.map((label) => ({
        ...SERIES_OPTIONS,
        dataKey: label,
        label,
      }))}
      xAxis={[{ dataKey: "date", scaleType: "time" }]}
    />
  );
}
