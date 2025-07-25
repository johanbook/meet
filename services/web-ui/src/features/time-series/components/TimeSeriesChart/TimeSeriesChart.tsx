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
import { format } from "src/utils/string";

import { CHART_CONFIGS } from "../../utils/chart.config";
import { getChartData } from "../../utils/stats.helper";

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

  const config = CHART_CONFIGS[aggregation];

  const data = useMemo(
    () => getChartData(timeSeries, config),
    [config, timeSeries],
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
            // NB: `null` is passed if user is trying to deselect option
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
