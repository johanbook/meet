import { FC } from "react";

import { scaleLinear, scaleTime } from "d3-scale";
import { curveBumpX, line } from "d3-shape";

import CoreChart, {
  DrawChartProps,
  SharedChartProps,
} from "../StackedBarChart/CoreChart";

interface DataPoint {
  date: string | Date;
  value: number;
}

interface LineChartProps extends SharedChartProps {
  data: DataPoint[];
  height: number;
}

const LineChart: FC<LineChartProps> = ({ data, ...props }) => {
  const drawChart = ({ height, svg, width }: DrawChartProps) => {
    if (data.length === 0) {
      return;
    }

    const values = data.map((point) => point.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const xDomain = [new Date(data[0].date), new Date(data.at(-1).date)];
    const yDomain = [minValue, maxValue];

    const x = scaleTime().domain(xDomain).range([0, width]);
    const y = scaleLinear().domain(yDomain).range([height, 0]);

    const path = line<DataPoint>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value))
      .curve(curveBumpX);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", path);
  };

  return (
    <CoreChart
      dependencies={[data]}
      drawChart={drawChart}
      margin={{
        top: 2,
        left: 0,
        right: 0,
        bottom: 2,
      }}
      {...props}
    />
  );
};

export default LineChart;
