import { ReactElement, useMemo, useState } from "react";

import { Box, MenuItem, Typography, alpha, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";
import {
  DATE_SHORTCUTS,
  DateRange,
  DateRangePicker,
  Select,
} from "src/components/ui";
import { format } from "src/utils/string";

import { CHART_CONFIGS } from "./chart.config";
import { getChartData } from "./stats.helper";

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

  const [dateRange, setDateRange] = useState<DateRange>(
    DATE_SHORTCUTS.LastYear,
  );

  const config = CHART_CONFIGS[aggregation];

  const data = useMemo(
    () => getChartData(timeSeries, config, dateRange),
    [config, dateRange, timeSeries],
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
      <Typography color="textSecondary" sx={{ pb: 2 }}>
        A visualization of your time series.
      </Typography>

      <Box>
        <Typography gutterBottom sx={{ mb: 1 }}>
          <b>Time Range</b>
        </Typography>
        <DateRangePicker fullWidth onChange={setDateRange} value={dateRange} />

        <Typography gutterBottom sx={{ mt: 2 }}>
          <b>Aggregation</b>
        </Typography>

        <Select
          onChange={(value) =>
            setAggregation(value as TimeSeriesDetailsAggregationEnum)
          }
          sx={{ mb: 2 }}
          value={aggregation}
        >
          {Object.entries(TimeSeriesDetailsAggregationEnum).map(
            ([name, value]) => (
              <MenuItem key={value} value={value}>
                {format(name)}
              </MenuItem>
            ),
          )}
        </Select>
      </Box>

      <LineChart
        dataset={data}
        height={300}
        margin={{ left: 0, right: 0 }}
        series={timeSeries.labels.map((label) => ({
          ...SERIES_OPTIONS,
          color: getColor(label),
          dataKey: label,
          label,
        }))}
        xAxis={[
          {
            dataKey: "date",
            scaleType: config.scaleType,
            valueFormatter: (value: string) => config.getLabel(value),
          },
        ]}
      />
    </>
  );
}
