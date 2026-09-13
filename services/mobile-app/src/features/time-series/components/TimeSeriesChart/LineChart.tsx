import { View } from "react-native";

import { Typography } from "src/components/ui/Typography/Typography";

export interface ChartSeries {
  color: string;
  dataKey: string;
  label: string;
}

export type ChartDatum = Record<string, string | number>;

interface LineChartProps {
  data: ChartDatum[];
  height?: number;
  series: ChartSeries[];
}

const PADDING = 24;
const DOT_RADIUS = 4;
const SEGMENT_THICKNESS = 2;
const PLOT_WIDTH = 320;

interface Point {
  x: number;
  y: number;
}

interface Segment {
  angle: number;
  length: number;
  midX: number;
  midY: number;
}

function toDegree(radians: number): number {
  return (radians * 180) / Math.PI;
}

/** A straight line piece between two points, drawn as a rotated View. */
function segmentBetween(from: Point, to: Point): Segment {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  return {
    angle: toDegree(Math.atan2(dy, dx)),
    length: Math.sqrt(dx * dx + dy * dy),
    midX: (from.x + to.x) / 2,
    midY: (from.y + to.y) / 2,
  };
}

export function LineChart({ data, height = 300, series }: LineChartProps) {
  const width = PLOT_WIDTH;
  const plotWidth = width - PADDING * 2;
  const plotHeight = height - PADDING * 2;

  const values = data.flatMap((datum) =>
    series.map((item) => Number(datum[item.dataKey])),
  );

  if (data.length === 0 || values.length === 0) {
    return (
      <View
        style={{ alignItems: "center", justifyContent: "center", padding: 32 }}
      >
        <Typography color="textSecondary" variant="body2">
          No data in the selected range
        </Typography>
      </View>
    );
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const span = Math.max(maxValue - minValue, 1);

  const points = data.map((datum, index) => {
    const x =
      data.length > 1
        ? PADDING + (index / (data.length - 1)) * plotWidth
        : PADDING + plotWidth / 2;

    const column: Record<string, Point> = {};

    for (const item of series) {
      const value = Number(datum[item.dataKey] ?? 0);
      const y = PADDING + plotHeight - ((value - minValue) / span) * plotHeight;

      column[item.dataKey] = { x, y };
    }

    return column;
  });

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ height, position: "relative", width }}>
        {series.map((item) => {
          const segments: Segment[] = [];

          for (let index = 1; index < points.length; index++) {
            segments.push(
              segmentBetween(
                points[index - 1][item.dataKey],
                points[index][item.dataKey],
              ),
            );
          }

          return (
            <View key={item.dataKey} pointerEvents="none">
              {segments.map((segment, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: item.color,
                    height: SEGMENT_THICKNESS,
                    left: segment.midX - segment.length / 2,
                    position: "absolute",
                    top: segment.midY - SEGMENT_THICKNESS / 2,
                    transform: [{ rotate: `${segment.angle}deg` }],
                    width: segment.length,
                  }}
                />
              ))}
              {points.map((column, index) => (
                <View
                  key={`${item.dataKey}-${index}`}
                  style={{
                    backgroundColor: item.color,
                    borderRadius: DOT_RADIUS,
                    height: DOT_RADIUS * 2,
                    left: column[item.dataKey].x - DOT_RADIUS,
                    position: "absolute",
                    top: column[item.dataKey].y - DOT_RADIUS,
                    width: DOT_RADIUS * 2,
                  }}
                />
              ))}
            </View>
          );
        })}
      </View>
      {series.map((item) => (
        <View
          key={item.dataKey}
          style={{ alignItems: "center", flexDirection: "row", marginTop: 4 }}
        >
          <View
            style={{
              backgroundColor: item.color,
              borderRadius: 2,
              height: 8,
              marginRight: 4,
              width: 8,
            }}
          />
          <Typography color="textSecondary" variant="caption">
            {item.label}
          </Typography>
        </View>
      ))}
    </View>
  );
}
