import { axisBottom, axisLeft, axisRight, line, select } from "d3";
import {
  drawNegativeRect,
  drawRect,
  drawVerticalLine,
} from "../../utils/svg/svg.utils";
import {
  BG_LINE_CLASSNAME,
  BG_LINES_CLASSNAME,
  BORDER_RADIUS,
  BOTTOM_AXIS_CLASSNAME,
  CHART_LINE,
  CHART_VERTICAL_BARS,
  COMPONENT_CLASSNAME,
  LEFT_AXIS_CLASSNAME,
  RIGHT_AXIS_CLASSNAME,
  SCALE_GAP,
  TEXT_CLASSNAME,
  X_AXIS_SPACE,
  Y_AXIS_SPACE,
} from "./useChart.constants";
import {
  IAxisComponent,
  IBackgroundLinesComponent,
  IChart,
  IComponents,
  ILineComponent,
  IVerticalBarsComponent,
  TData,
  TValueName,
} from "./useChart.types";

export default {
  /**
   * Bottom Axis component
   * -----------------------------------------------------------------------
   * @description Element that rendered at the bottom of the charts with
   * the purpose to serve as guideline on the `x` axis.
   */
  ["bottom-axis"](
    { format, ticks, value }: IAxisComponent,
    { internalDimensions, scales, schema, svg }: IChart,
  ) {
    const xGap = schema.xAxisGap || X_AXIS_SPACE;
    const yGap = schema.yAxisGap || Y_AXIS_SPACE;
    return svg
      .append("g")
      .attr("class", BOTTOM_AXIS_CLASSNAME)
      .attr(
        "transform",
        `translate(${internalDimensions.left + xGap}, ${
          internalDimensions.height + yGap
        })`,
      )
      .call(
        axisBottom(scales[`${value}Scale`] as any)
          .tickFormat(format || null)
          .ticks(ticks || null)
          .tickSize(0),
      )
      .call((g: any) => g.select(".domain").attr("stroke-width", 0))
      .call((g: any) => g.selectAll("text").attr("class", TEXT_CLASSNAME));
  },

  /**
   * Left Axis component
   * -----------------------------------------------------------------------
   * @description Element that rendered at the left of the charts with
   * the purpose to serve as guideline on a `y` axis.
   */
  ["left-axis"](
    { format, ticks, value }: IAxisComponent,
    { internalDimensions, scales, schema, svg }: IChart,
  ) {
    return svg
      .append("g")
      .attr("class", LEFT_AXIS_CLASSNAME)
      .attr("transform", `translate(${internalDimensions.left}, 0)`)
      .call(
        axisLeft(scales[`${value}Scale`] as any)
          .tickFormat(format)
          .tickValues(ticks || schema.values[value].domain)
          .tickSize(0),
      )
      .call((g: any) => g.select(".domain").attr("stroke-width", 0))
      .call((g: any) => g.selectAll("text").attr("class", TEXT_CLASSNAME));
  },

  /**
   * Right Axis component
   * -----------------------------------------------------------------------
   * @description Element that rendered at the right of the charts with
   * the purpose to serve as guideline on a `y` axis as well.
   */
  ["right-axis"](
    { format, ticks, value }: IAxisComponent,
    { dimensions, internalDimensions, scales, schema, svg }: IChart,
  ) {
    return svg
      .append("g")
      .attr("class", RIGHT_AXIS_CLASSNAME)
      .attr(
        "transform",
        `translate(${dimensions.width - internalDimensions.right}, 0)`,
      )
      .call(
        axisRight(scales[`${value}Scale`] as any)
          .tickFormat(format)
          .tickValues(ticks || schema.values[value].domain)
          .tickSize(0),
      )
      .call((g: any) => g.select(".domain").attr("stroke-width", 0))
      .call((g: any) => g.selectAll("text").attr("class", TEXT_CLASSNAME));
  },

  /**
   * Background Lines component
   * -----------------------------------------------------------------------
   * @description Element that renders vertical lines normally placed
   * behind charts.
   */
  ["background-lines"](
    { value }: IBackgroundLinesComponent,
    { internalDimensions, scales, schema, svg }: IChart,
    data: TData,
  ) {
    const scaleX = scales[`${value}Scale`] as any;
    const isScaleTime = schema.values[`${value}`].scale === "time";
    const xGap = schema.xAxisGap || X_AXIS_SPACE;
    const width = scaleX.bandwidth ? scaleX.bandwidth() : 0;
    const height = internalDimensions.height;
    const leftPos = internalDimensions.left + xGap;
    const $component = svg
      .append("g")
      .attr("class", BG_LINES_CLASSNAME)
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .call((g: any) =>
        g
          .attr("d", (d: TValueName) =>
            drawVerticalLine({
              x: leftPos + scaleX(isScaleTime ? new Date(d[value]) : d[value]),
              y: 0,
              w: width,
              h: height,
            }),
          )
          .attr("class", BG_LINE_CLASSNAME),
      );
    return $component;
  },

  /**
   * Vertical Bars component
   * -----------------------------------------------------------------------
   * @description Element that renders vertical bars.
   */
  ["vertical-bars"](
    {
      barWidth,
      borderRadius,
      disabledColor,
      enabledColor,
      gap,
      hoveredColor,
      strokeColor,
      strokeOpacity,
      strokeWidth,
      value,
    }: IVerticalBarsComponent,
    { internalDimensions, scales, schema, svg, theme }: IChart,
    data: TData,
  ) {
    const xGap = schema.xAxisGap || X_AXIS_SPACE;
    const scaleX = scales[`${value[0]}Scale`] as any;
    const scaleY = scales[`${value[1]}Scale`] as any;
    const bGap = gap || SCALE_GAP / 2;
    const isScaleTime = schema.values[`${value[0]}`].scale === "time";
    const colWidth = internalDimensions.width / data.length - bGap;
    const halfColWidth = colWidth / 2;
    const bWidth = barWidth || colWidth;
    const halfWidth = isScaleTime
      ? -bWidth / 2
      : halfColWidth - bWidth / 2 + bGap / 2;
    const left = internalDimensions.left + xGap;
    const $component = svg
      .append("g")
      .attr("class", CHART_VERTICAL_BARS)
      .style(
        "--component-enabled-color",
        enabledColor ? theme.__COLORS[enabledColor] : theme.chart.valueEnabled,
      )
      .style(
        "--component-hovered-color",
        hoveredColor ? theme.__COLORS[hoveredColor] : theme.chart.valueHovered,
      )
      .style(
        "--component-disabled-color",
        disabledColor
          ? theme.__COLORS[disabledColor]
          : theme.chart.valueDisabled,
      )
      .style(
        "--component-stroke-color",
        strokeColor ? theme.__COLORS[strokeColor] : theme.chart.strokeColor,
      )
      .style(
        "--component-stroke-opacity",
        strokeOpacity || theme.chart.strokeOpacity,
      )
      .style("--component-stroke-width", strokeWidth || theme.chart.strokeWidth)
      .selectAll("path")
      .data(data.filter((d) => !!d[value[1]]))
      .enter()
      .append("path")
      .call((g) =>
        g
          .attr("d", (d: TValueName, i: number) => {
            const yVal = d[value[1]];
            const xVal = scaleX(
              isScaleTime ? new Date(d[value[0]]) : d[value[0]],
            );
            const rectConfig = {
              x: left + xVal + halfWidth,
              y: scaleY(0),
              w: bWidth,
              h: scaleY(0) - scaleY(yVal),
              r: borderRadius || BORDER_RADIUS,
            };
            return yVal > 0
              ? drawRect(rectConfig)
              : yVal < 0
              ? drawNegativeRect(rectConfig)
              : null;
          })
          .attr("class", COMPONENT_CLASSNAME)
          .on("mouseover", function onBarOver() {
            select(this).classed("hovered", true);
          })
          .on("mouseout", function onBarOut() {
            select(this).classed("hovered", false);
          }),
      );
    return $component;
  },

  /**
   * Render Line component
   * -----------------------------------------------------------------------
   * @description Element that renders a chart of type line.
   */
  ["line"](
    { disabledColor, enabledColor, hoveredColor, value }: ILineComponent,
    { internalDimensions, scales, schema, svg, theme }: IChart,
    data: TData,
  ) {
    const scaleX = scales[`${value[0]}Scale`] as any;
    const scaleY = scales[`${value[1]}Scale`] as any;
    const xGap = schema.xAxisGap || X_AXIS_SPACE;
    const isScaleTime = schema.values[`${value[0]}`].scale === "time";
    const width = isScaleTime ? 0 : internalDimensions.width / data.length / 2;
    const drawLine: any = line(
      (d: any) =>
        internalDimensions.left +
        xGap +
        width +
        scaleX(isScaleTime ? new Date(d[value[0]]) : d[value[0]]),
      (d: any) => scaleY(d[value[1]]),
    );
    const $component = svg
      .append("g")
      .attr("class", CHART_LINE)
      .style(
        "--component-enabled-color",
        enabledColor ? theme.__COLORS[enabledColor] : theme.chart.valueEnabled,
      )
      .style(
        "--component-hovered-color",
        hoveredColor ? theme.__COLORS[hoveredColor] : theme.chart.valueHovered,
      )
      .style(
        "--component-disabled-color",
        disabledColor
          ? theme.__COLORS[disabledColor]
          : theme.chart.valueDisabled,
      )
      .append("path")
      .attr("d", drawLine(data))
      .attr("class", COMPONENT_CLASSNAME);
    return $component;
  },
} as IComponents;
