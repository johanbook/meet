import { ReactElement, useMemo } from "react";

import { BarChart } from "@mui/x-charts";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";

import { getAggregatedData } from "../../utils/stats.helper";

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
    <BarChart
      dataset={data}
      height={300}
      series={timeSeries.labels.map((label) => ({
        dataKey: label,
        stack: "default",
      }))}
      xAxis={[{ dataKey: "date" }]}
    />
  );
}
