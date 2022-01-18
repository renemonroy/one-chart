import {
  axisBottom,
  axisLeft,
  axisRight,
  extent,
  interpolateRound,
  line,
  max,
  min,
  scaleBand,
  scaleLinear,
  scaleTime,
  select,
} from "d3";
import { ILegend } from "../Legends/Legends.types";
import {
  drawRect,
  drawNegativeRect,
  drawVerticalLine,
} from "../../utils/svg/svg.utils";
import * as types from "./Chart.types";
import * as constants from "./Chart.constants";

/**
 * getAxisGraphs
 * -----------------------------------------------------------------------
 */
export function getAxisGraphs(graphs: types.ISchemaGraphs) {
  return graphs.filter((graph) =>
    graph.shape.includes("-axis"),
  ) as types.IAxisGraph[];
}

export function getInternalDimensions(
  dimensions: DOMRectReadOnly,
  schema: types.ISchema,
) {
  const { height, width } = dimensions;
  const { graphs } = schema;
  const { AXIS_WIDTH, AXIS_HEIGHT } = constants;
  const xGap = schema.xAxisGap || constants.X_AXIS_SPACE;
  const yGap = schema.yAxisGap || constants.Y_AXIS_SPACE;
  const axisDimensions = getAxisGraphs(graphs).reduce(
    (acc, curr) => {
      acc.width = (curr?.width || AXIS_WIDTH) + acc.width;
      acc.height = (curr?.height || AXIS_HEIGHT) + acc.height;
      if (curr.shape == "left-axis" && curr?.width) {
        acc.width = acc.width + xGap;
        acc.left = acc.left + curr.width;
      }
      if (curr.shape == "right-axis" && curr?.width) {
        acc.width = acc.width + xGap;
        acc.right = acc.right + curr.width;
      }
      return acc;
    },
    { width: 0, height: 0, left: 0, right: 0 },
  );
  return {
    ...dimensions,
    width: width - axisDimensions.width,
    height: height - axisDimensions.height - yGap,
    left: axisDimensions.left,
    right: axisDimensions.right,
  };
}

/**
 * getScaleBand
 * -----------------------------------------------------------------------
 */
export function getScaleBand(config: types.IScaleConfig) {
  const { dimensions, data, value, domain, range, size } = config;
  return scaleBand()
    .domain(domain ? domain : data.map((d) => (d as types.TValueName)[value]))
    .range(range ? [range[0], range[1]] : [0, size || dimensions.width]);
  // .paddingInner(gap || constants.SCALE_GAP);
}

/**
 * getScaleLinear
 * -----------------------------------------------------------------------
 */
export function getScaleLinear(config: types.IScaleConfig) {
  const { dimensions, data, value, domain, range } = config;
  const maxVal = max(data, (d) => (d as types.TValueName)[value]);
  return scaleLinear()
    .domain(domain ? [domain[0], domain[1]] : [0, maxVal])
    .nice()
    .range(range ? [range[1], range[0]] : [dimensions.height, 0])
    .interpolate(interpolateRound);
}

/**
 * getScaleTime
 * -----------------------------------------------------------------------
 */
export function getScaleTime(config: types.IScaleConfig) {
  const { data, dimensions, domain, range, size, value } = config;
  return scaleTime()
    .domain(
      domain
        ? domain
        : (extent(data, (d) => new Date(d[value] as string)) as any),
    )
    .range(range ? [range[0], range[1]] : [0, size || dimensions.width]);
}

/**
 * buildScale
 * -----------------------------------------------------------------------
 */
export function buildScale(
  scaleType: types.TScaleType,
  scaleConfig: types.IScaleConfig,
) {
  switch (scaleType) {
    case "band":
      return getScaleBand(scaleConfig);
    case "linear":
      return getScaleLinear(scaleConfig);
    case "time":
      return getScaleTime(scaleConfig);
  }
}

/**
 * buildScales
 * -----------------------------------------------------------------------
 */
export function buildScales(
  dimensions: DOMRectReadOnly,
  schema: types.ISchema,
  data: types.TData,
) {
  const values = schema.values;
  return Object.keys(values).reduce((acc, curr) => {
    const { scale, ...rest } = values[curr];
    const config = { ...rest, data, dimensions, value: curr };
    acc[`${curr}Scale`] = buildScale(scale, config);
    return acc;
  }, {} as any); // @ToDo: Figure the type instead "any"
}

/**
 * renderBottomAxis
 * -----------------------------------------------------------------------
 */
export function renderBottomAxis(
  graph: types.IAxisGraph,
  config: types.IGraphsConfig,
) {
  const xGap = config.schema.xAxisGap || constants.X_AXIS_SPACE;
  const yGap = config.schema.yAxisGap || constants.Y_AXIS_SPACE;
  return config.svg
    .append("g")
    .attr("class", constants.BOTTOM_AXIS_CLASSNAME)
    .attr(
      "transform",
      `translate(${config.internalDimensions.left + xGap}, ${
        config.internalDimensions.height + yGap
      })`,
    )
    .call(
      axisBottom(config.scales[`${graph.value}Scale`] as any)
        .tickFormat(graph.format || null)
        .ticks(graph.ticks || null)
        .tickSize(0),
    )
    .call((g) => g.select(".domain").attr("stroke-width", 0))
    .call((g) => g.selectAll("text").attr("class", constants.TEXT_CLASSNAME));
}

/**
 * renderLeftAxis
 * -----------------------------------------------------------------------
 */
export function renderLeftAxis(
  graph: types.IAxisGraph,
  config: types.IGraphsConfig,
) {
  return config.svg
    .append("g")
    .attr("class", constants.LEFT_AXIS_CLASSNAME)
    .attr("transform", `translate(${config.internalDimensions.left}, 0)`)
    .call(
      axisLeft(config.scales[`${graph.value}Scale`] as any)
        .tickFormat(graph.format)
        .tickValues(graph.ticks || config.schema.values[graph.value].domain)
        .tickSize(0),
    )
    .call((g) => g.select(".domain").attr("stroke-width", 0))
    .call((g) => g.selectAll("text").attr("class", constants.TEXT_CLASSNAME));
}

/**
 * renderRightAxis
 * -----------------------------------------------------------------------
 */
export function renderRightAxis(
  graph: types.IAxisGraph,
  config: types.IGraphsConfig,
) {
  return config.svg
    .append("g")
    .attr("class", constants.RIGHT_AXIS_CLASSNAME)
    .attr(
      "transform",
      `translate(${
        config.dimensions.width - config.internalDimensions.right
      }, 0)`,
    )
    .call(
      axisRight(config.scales[`${graph.value}Scale`] as any)
        .tickFormat(graph.format)
        .tickValues(graph.ticks || config.schema.values[graph.value].domain)
        .tickSize(0),
    )
    .call((g) => g.select(".domain").attr("stroke-width", 0))
    .call((g) => g.selectAll("text").attr("class", constants.TEXT_CLASSNAME));
}

/**
 * renderBackgroundLines
 * -----------------------------------------------------------------------
 */
export function renderBackgroundLines(
  graph: types.IBackgroundLines,
  data: types.TData,
  config: types.IGraphsConfig,
) {
  const scaleX = config.scales[`${graph.value}Scale`] as any;
  const isScaleTime = config.schema.values[`${graph.value}`].scale === "time";
  const xGap = config.schema.xAxisGap || constants.X_AXIS_SPACE;
  const width = scaleX.bandwidth ? scaleX.bandwidth() : 0;
  const height = config.internalDimensions.height;
  const leftPos = config.internalDimensions.left + xGap;
  const $graph = config.svg
    .append("g")
    .attr("class", constants.BG_LINES_CLASSNAME)
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .call((g) =>
      g
        .attr("d", (d: types.TValueName) =>
          drawVerticalLine({
            x:
              leftPos +
              scaleX(isScaleTime ? new Date(d[graph.value]) : d[graph.value]),
            y: 0,
            w: width,
            h: height,
          }),
        )
        .attr("class", constants.BG_LINE_CLASSNAME),
    );
  return $graph;
}

/**
 * renderVerticalBars
 * -----------------------------------------------------------------------
 */
export function renderVerticalBars(
  graph: types.IVerticalBarsGraph,
  data: types.TData,
  config: types.IGraphsConfig,
) {
  const xGap = config.schema.xAxisGap || constants.X_AXIS_SPACE;
  const theme = config.theme;
  const scaleX = config.scales[`${graph.value[0]}Scale`] as any;
  const scaleY = config.scales[`${graph.value[1]}Scale`] as any;
  const barGap = graph.gap || constants.SCALE_GAP / 2;
  const isScaleTime =
    config.schema.values[`${graph.value[0]}`].scale === "time";
  const barWidth = config.internalDimensions.width / data.length - barGap;
  const halfWidth = isScaleTime ? barWidth / 2 : -barGap / 2;
  const left = config.internalDimensions.left + xGap;
  const $graph = config.svg
    .append("g")
    .attr("class", constants.CHART_VERTICAL_BARS)
    .style(
      "--shape-enabled-color",
      graph.enabledColor
        ? theme.__COLORS[graph.enabledColor]
        : theme.chart.valueEnabled,
    )
    .style(
      "--shape-hovered-color",
      graph.hoveredColor
        ? theme.__COLORS[graph.hoveredColor]
        : theme.chart.valueHovered,
    )
    .style(
      "--shape-disabled-color",
      graph.disabledColor
        ? theme.__COLORS[graph.disabledColor]
        : theme.chart.valueDisabled,
    )
    .style(
      "--shape-stroke-color",
      graph.strokeColor
        ? theme.__COLORS[graph.strokeColor]
        : theme.chart.strokeColor,
    )
    .style(
      "--shape-stroke-opacity",
      graph.strokeOpacity || theme.chart.strokeOpacity,
    )
    .style("--shape-stroke-width", graph.strokeWidth || theme.chart.strokeWidth)
    .selectAll("path")
    .data(data.filter((d) => !!d[graph.value[1]]))
    .enter()
    .append("path")
    .call((g) =>
      g
        .attr("d", (d: types.TValueName, i: number) => {
          const yVal = d[graph.value[1]];
          const xVal = scaleX(
            isScaleTime ? new Date(d[graph.value[0]]) : d[graph.value[0]],
          );
          const rectConfig = {
            x: left + xVal - halfWidth,
            y: scaleY(0),
            w: barWidth,
            h: scaleY(0) - scaleY(yVal),
            r: graph.borderRadius || constants.BORDER_RADIUS,
          };
          return yVal > 0
            ? drawRect(rectConfig)
            : yVal < 0
            ? drawNegativeRect(rectConfig)
            : null;
        })
        .attr("class", constants.SHAPE_CLASSNAME)
        .on("mouseover", function onBarOver() {
          select(this).classed("hovered", true);
        })
        .on("mouseout", function onBarOut() {
          select(this).classed("hovered", false);
        }),
    );
  return $graph;
}

/**
 * renderLine
 * -----------------------------------------------------------------------
 * @TODO - figure out all 'any' and remove them properly
 */
export function renderLine(
  graph: types.ILineGraph,
  data: types.TData,
  config: types.IGraphsConfig,
) {
  const theme = config.theme;
  const scaleX = config.scales[`${graph.value[0]}Scale`] as any;
  const scaleY = config.scales[`${graph.value[1]}Scale`] as any;
  const xGap = config.schema.xAxisGap || constants.X_AXIS_SPACE;
  const isScaleTime =
    config.schema.values[`${graph.value[0]}`].scale === "time";
  const width = isScaleTime
    ? 0
    : config.internalDimensions.width / data.length / 2;
  const drawLine: any = line(
    (d: any) =>
      config.internalDimensions.left +
      xGap +
      width +
      scaleX(isScaleTime ? new Date(d[graph.value[0]]) : d[graph.value[0]]),
    (d: any) => scaleY(d[graph.value[1]]),
  );
  const $graph = config.svg
    .append("g")
    .attr("class", constants.CHART_LINE)
    .style(
      "--shape-enabled-color",
      graph.enabledColor
        ? theme.__COLORS[graph.enabledColor]
        : theme.chart.valueEnabled,
    )
    .style(
      "--shape-hovered-color",
      graph.hoveredColor
        ? theme.__COLORS[graph.hoveredColor]
        : theme.chart.valueHovered,
    )
    .style(
      "--shape-disabled-color",
      graph.disabledColor
        ? theme.__COLORS[graph.disabledColor]
        : theme.chart.valueDisabled,
    )
    .append("path")
    .attr("d", drawLine(data))
    .attr("class", constants.SHAPE_CLASSNAME);
  return $graph;
}

/**
 * renderGraph
 * -----------------------------------------------------------------------
 */
export function renderGraph(
  graph: types.TSchemaGraph,
  data: types.TData,
  config: types.IGraphsConfig,
) {
  switch (graph.shape) {
    case "bottom-axis":
      renderBottomAxis(graph as types.IAxisGraph, config);
      break;
    case "left-axis":
      renderLeftAxis(graph as types.IAxisGraph, config);
      break;
    case "right-axis":
      renderRightAxis(graph as types.IAxisGraph, config);
      break;
    case "background-lines":
      renderBackgroundLines(graph as types.IBackgroundLines, data, config);
      break;
    case "vertical-bars":
      renderVerticalBars(graph as types.IVerticalBarsGraph, data, config);
      break;
    case "line":
      renderLine(graph as types.ILineGraph, data, config);
      break;
  }
}

/**
 * renderGraphs
 * -----------------------------------------------------------------------
 */
export function renderGraphs(
  schema: types.ISchema,
  data: types.TData,
  config: types.IGraphsConfig,
) {
  config.svg.selectAll("g").remove();
  schema.graphs.forEach((graph: types.TSchemaGraph) => {
    renderGraph(graph, data, config);
  });
}

/**
 * getLegendShape
 * -----------------------------------------------------------------------
 */
export function getLegendShape(name: string) {
  switch (name) {
    case "line":
      return "line";
    case "vertical-bars":
    default:
      return "dot";
  }
}

/**
 * buildLegends
 * -----------------------------------------------------------------------
 */
export function buildLegends(
  schema: types.ISchema,
  config: types.IGraphsConfig,
) {
  return schema.graphs.reduce((acc, curr) => {
    if (curr?.legend) {
      acc.push({
        color: curr.enabledColor || config.theme.chart.valueEnabled,
        label: curr.legend,
        shape: getLegendShape(curr.shape),
      });
    }
    return acc;
  }, [] as ILegend[]);
}
