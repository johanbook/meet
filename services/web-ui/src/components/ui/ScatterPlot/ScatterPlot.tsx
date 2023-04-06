import React from "react";
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PALETTE from "../../../theme/palette";

interface ScatterPlotProps {
  data: unknown[];
  title: string;
  xkey: string;
  xlabel: string;
  ykey: string;
  ylabel: string;
}

export default function ScatterPlot({
  data,
  title,
  xkey,
  xlabel,
  ykey,
  ylabel,
}: ScatterPlotProps): React.ReactElement {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 60,
        }}
      >
        <YAxis type="category" dataKey={xkey} minTickGap={20} name={ylabel} />
        <XAxis type="number" dataKey={ykey} name="Discrepancy" unit={xlabel} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          name={title}
          data={data}
          fill={PALETTE["primary"]}
          stroke="black"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
