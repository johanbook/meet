import { useMemo, useState } from "react";
import { View } from "react-native";

import { TimeSeriesDetails, TimeSeriesDetailsAggregationEnum } from "src/api";
import {
  DATE_SHORTCUTS,
  DateRange,
  DateRangePicker,
  Select,
} from "src/components/ui";
import { useTheme } from "src/core/theme";
import { format } from "src/utils";
import { alpha } from "src/utils/color";

import { CHART_CONFIGS } from "./chart.config";
import { LineChart } from "./LineChart";
import { getChartData } from "./stats.helper";

interface TimeSeriesChartProps {
  timeSeries: TimeSeriesDetails;
}

const SERIES_COLOR_KEYS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
] as const;

export function TimeSeriesChart({ timeSeries }: TimeSeriesChartProps) {
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
  const seriesColors = SERIES_COLOR_KEYS.map((key) => theme.palette[key]);

  const series = timeSeries.labels.map((label, index) => ({
    color: alpha(seriesColors[index % seriesColors.length], 0.4),
    dataKey: label,
    label,
  }));

  return (
    <View>
      <Select
        items={Object.entries(TimeSeriesDetailsAggregationEnum).map(
          ([name, value]) => ({ label: format(name), value }),
        )}
        label="Aggregation"
        onValueChange={(value) =>
          setAggregation(value as TimeSeriesDetailsAggregationEnum)
        }
        value={aggregation}
      />
      <DateRangePicker onValueChange={setDateRange} value={dateRange} />
      <LineChart data={data} height={300} series={series} />
    </View>
  );
}
