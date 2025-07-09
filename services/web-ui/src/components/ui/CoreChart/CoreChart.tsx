import { FC, useEffect, useRef } from "react";

import { Selection, select } from "d3-selection";

const DEFAULT_MARGINS = Object.freeze({
  top: 20,
  left: 50,
  bottom: 30,
  right: 10,
});

export interface DrawChartProps {
  /** Height of chart */
  height: number;
  /** Parent SVG. Should only be used for adding global event handlers, like for zoom */
  parentSvg: Selection<SVGSVGElement, unknown, null, undefined>;
  /** Method for redrawing chart on e.g. rescale or zoom */
  redrawChart: (props: DrawChartProps) => void;
  /** D3 SVG chart of element that should be used for drawing elements onto chart */
  svg: Selection<SVGGElement, unknown, null, undefined>;
  /** Width of chart */
  width: number;
}

/** Interface that all charts should implement */
export interface SharedChartProps {
  height: number;
  margin?: { left: number; right: number; top: number; bottom: number };
}

interface CoreChartProps extends SharedChartProps {
  dependencies?: unknown[];
  drawChart: (props: DrawChartProps) => void;
  width: number;
}

export const CoreChart: FC<CoreChartProps> = ({
  dependencies = [],
  drawChart,
  height: fullHeight,
  margin = DEFAULT_MARGINS,
  width: fullWidth,
}) => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  const height = fullHeight - margin.top - margin.bottom;
  const width = fullWidth - margin.left - margin.right;

  useEffect(() => {
    const svgElement = d3Container.current;

    if (!svgElement) {
      return;
    }

    // Clears the previous drawings. Needed when updating,
    // such as at resizing
    select(svgElement).selectAll("*").remove();

    const svg = select(svgElement).append("g");

    svg
      .attr("height", fullHeight)
      .attr("width", fullWidth)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    drawChart({
      height,
      parentSvg: select(svgElement),
      redrawChart: (props) => {
        svg.selectAll("*").remove();
        drawChart(props);
      },
      svg,
      width,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d3Container.current, height, width, ...dependencies]);

  return <svg height={fullHeight} ref={d3Container} width={fullWidth} />;
};
