import { TimeSeriesDetails } from "src/api";

interface TimeSeriesStat {
  label: string;
  value: number;
}

const getTotalValues = (timeSeries: TimeSeriesDetails): TimeSeriesStat[] => {
  const labelTotal: Record<string, TimeSeriesStat> = {};

  for (const point of timeSeries.points) {
    const { label, value } = point;

    if (label in labelTotal) {
      labelTotal[label].value += value;
    } else {
      labelTotal[label] = { label: `${label} (total)`, value };
    }
  }

  return Object.values(labelTotal);
};

const getCurrentMonthValues = (
  timeSeries: TimeSeriesDetails,
): TimeSeriesStat[] => {
  const labelTotal: Record<string, TimeSeriesStat> = {};

  const currentMonth = new Date().toJSON().slice(0, 7);

  for (const point of timeSeries.points) {
    if (!point.createdAt.startsWith(currentMonth)) {
      continue;
    }

    const { label, value } = point;

    if (label in labelTotal) {
      labelTotal[label].value += value;
    } else {
      labelTotal[label] = { label: `${label} (current month)`, value };
    }
  }

  return Object.values(labelTotal);
};

export const getTimeSeriesStats = (
  timeSeries: TimeSeriesDetails,
): TimeSeriesStat[] => {
  return [...getTotalValues(timeSeries), ...getCurrentMonthValues(timeSeries)];
};
