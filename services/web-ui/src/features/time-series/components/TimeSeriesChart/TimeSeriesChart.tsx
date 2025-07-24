import { ReactElement, useState } from "react";

import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";
import { format } from "src/utils/string";

import { useTimeSeriesChart } from "../../hooks/useTimeSeriesChart";

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

  const { dataset, series, xAxis } = useTimeSeriesChart(
    timeSeries,
    aggregation,
  );

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
              <ToggleButton key={value} size="small" value={value}>
                {format(name)}
              </ToggleButton>
            ),
          )}
        </ToggleButtonGroup>
      </Box>

      <LineChart
        dataset={dataset}
        height={300}
        margin={{ left: 0, right: 0 }}
        series={series}
        xAxis={[xAxis]}
      />
    </>
  );
}
