import { ReactElement, useMemo, useState } from "react";

import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";

import {
  getAggregatedData,
  getAggregationDate,
} from "../../utils/stats.helper";

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
      <Typography color="textSecondary" sx={{ pb: 2 }}>
        A visualization of your time series.
      </Typography>

      <Box>
        <Typography gutterBottom>
          <b>Aggregation</b>
        </Typography>

        <ToggleButtonGroup
          exclusive
          onChange={(_, value) => {
            // NB: `null` is passed if user is trying to deslect option
            if (value) {
              setAggregation(value as TimeSeriesDetailsAggregationEnum);
            }
          }}
          sx={{ mb: 2 }}
          value={aggregation}
        >
          {Object.entries(TimeSeriesDetailsAggregationEnum).map(
            ([name, value]) => (
              <ToggleButton key={value} value={value}>
                {name}
              </ToggleButton>
            ),
          )}
        </ToggleButtonGroup>
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
            scaleType: "time",
            valueFormatter: (value) => {
              const date = new Date(value);
              const { label } = getAggregationDate(date, aggregation);
              return label;
            },
          },
        ]}
      />
    </>
  );
}
