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
 * getAxisComponents
 * -----------------------------------------------------------------------
 */
export function getAxisComponents(components: types.ISchemaComponents) {
  return components.filter((component) =>
    component["type"].includes("-axis"),
  ) as types.IAxisComponent[];
}

export function getInternalDimensions(
  dimensions: DOMRectReadOnly,
  schema: types.ISchema,
) {
  const { height, width } = dimensions;
  const { components } = schema;
  const { AXIS_WIDTH, AXIS_HEIGHT } = constants;
  const xGap = schema.xAxisGap || constants.X_AXIS_SPACE;
  const yGap = schema.yAxisGap || constants.Y_AXIS_SPACE;
  const axisDimensions = getAxisComponents(components).reduce(
    (acc, curr) => {
      acc.width = (curr?.width || AXIS_WIDTH) + acc.width;
      acc.height = (curr?.height || AXIS_HEIGHT) + acc.height;
      if (curr["type"] == "left-axis" && curr?.width) {
        acc.width = acc.width + xGap;
        acc.left = acc.left + curr.width;
      }
      if (curr["type"] == "right-axis" && curr?.width) {
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
  component: types.IAxisComponent,
  config: types.IComponentsConfig,
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
      axisBottom(config.scales[`${component.value}Scale`] as any)
        .tickFormat(component.format || null)
        .ticks(component.ticks || null)
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
  component: types.IAxisComponent,
  config: types.IComponentsConfig,
) {
  return config.svg
    .append("g")
    .attr("class", constants.LEFT_AXIS_CLASSNAME)
    .attr("transform", `translate(${config.internalDimensions.left}, 0)`)
    .call(
      axisLeft(config.scales[`${component.value}Scale`] as any)
        .tickFormat(component.format)
        .tickValues(
          component.ticks || config.schema.values[component.value].domain,
        )
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
  component: types.IAxisComponent,
  config: types.IComponentsConfig,
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
      axisRight(config.scales[`${component.value}Scale`] as any)
        .tickFormat(component.format)
        .tickValues(
          component.ticks || config.schema.values[component.value].domain,
        )
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
  component: types.IBackgroundLinesComponent,
  data: types.TData,
  config: types.IComponentsConfig,
) {
  const scaleX = config.scales[`${component.value}Scale`] as any;
  const isScaleTime =
    config.schema.values[`${component.value}`].scale === "time";
  const xGap = config.schema.xAxisGap || constants.X_AXIS_SPACE;
  const width = scaleX.bandwidth ? scaleX.bandwidth() : 0;
  const height = config.internalDimensions.height;
  const leftPos = config.internalDimensions.left + xGap;
  const $component = config.svg
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
              scaleX(
                isScaleTime ? new Date(d[component.value]) : d[component.value],
              ),
            y: 0,
            w: width,
            h: height,
          }),
        )
        .attr("class", constants.BG_LINE_CLASSNAME),
    );
  return $component;
}

/**
 * renderVerticalBars
 * -----------------------------------------------------------------------
 */
export function renderVerticalBars(
  component: types.IVerticalBarsComponent,
  data: types.TData,
  config: types.IComponentsConfig,
) {
  const xGap = config.schema.xAxisGap || constants.X_AXIS_SPACE;
  const theme = config.theme;
  const scaleX = config.scales[`${component.value[0]}Scale`] as any;
  const scaleY = config.scales[`${component.value[1]}Scale`] as any;
  const barGap = component.gap || constants.SCALE_GAP / 2;
  const isScaleTime =
    config.schema.values[`${component.value[0]}`].scale === "time";
  const barWidth = config.internalDimensions.width / data.length - barGap;
  const halfWidth = isScaleTime ? barWidth / 2 : -barGap / 2;
  const left = config.internalDimensions.left + xGap;
  const $component = config.svg
    .append("g")
    .attr("class", constants.CHART_VERTICAL_BARS)
    .style(
      "--component-enabled-color",
      component.enabledColor
        ? theme.__COLORS[component.enabledColor]
        : theme.chart.valueEnabled,
    )
    .style(
      "--component-hovered-color",
      component.hoveredColor
        ? theme.__COLORS[component.hoveredColor]
        : theme.chart.valueHovered,
    )
    .style(
      "--component-disabled-color",
      component.disabledColor
        ? theme.__COLORS[component.disabledColor]
        : theme.chart.valueDisabled,
    )
    .style(
      "--component-stroke-color",
      component.strokeColor
        ? theme.__COLORS[component.strokeColor]
        : theme.chart.strokeColor,
    )
    .style(
      "--component-stroke-opacity",
      component.strokeOpacity || theme.chart.strokeOpacity,
    )
    .style(
      "--component-stroke-width",
      component.strokeWidth || theme.chart.strokeWidth,
    )
    .selectAll("path")
    .data(data.filter((d) => !!d[component.value[1]]))
    .enter()
    .append("path")
    .call((g) =>
      g
        .attr("d", (d: types.TValueName, i: number) => {
          const yVal = d[component.value[1]];
          const xVal = scaleX(
            isScaleTime
              ? new Date(d[component.value[0]])
              : d[component.value[0]],
          );
          const rectConfig = {
            x: left + xVal - halfWidth,
            y: scaleY(0),
            w: barWidth,
            h: scaleY(0) - scaleY(yVal),
            r: component.borderRadius || constants.BORDER_RADIUS,
          };
          return yVal > 0
            ? drawRect(rectConfig)
            : yVal < 0
            ? drawNegativeRect(rectConfig)
            : null;
        })
        .attr("class", constants.COMPONENT_CLASSNAME)
        .on("mouseover", function onBarOver() {
          select(this).classed("hovered", true);
        })
        .on("mouseout", function onBarOut() {
          select(this).classed("hovered", false);
        }),
    );
  return $component;
}

/**
 * renderLine
 * -----------------------------------------------------------------------
 * @TODO - figure out all 'any' and remove them properly
 */
export function renderLine(
  component: types.ILineComponent,
  data: types.TData,
  config: types.IComponentsConfig,
) {
  const theme = config.theme;
  const scaleX = config.scales[`${component.value[0]}Scale`] as any;
  const scaleY = config.scales[`${component.value[1]}Scale`] as any;
  const xGap = config.schema.xAxisGap || constants.X_AXIS_SPACE;
  const isScaleTime =
    config.schema.values[`${component.value[0]}`].scale === "time";
  const width = isScaleTime
    ? 0
    : config.internalDimensions.width / data.length / 2;
  const drawLine: any = line(
    (d: any) =>
      config.internalDimensions.left +
      xGap +
      width +
      scaleX(
        isScaleTime ? new Date(d[component.value[0]]) : d[component.value[0]],
      ),
    (d: any) => scaleY(d[component.value[1]]),
  );
  const $component = config.svg
    .append("g")
    .attr("class", constants.CHART_LINE)
    .style(
      "--component-enabled-color",
      component.enabledColor
        ? theme.__COLORS[component.enabledColor]
        : theme.chart.valueEnabled,
    )
    .style(
      "--component-hovered-color",
      component.hoveredColor
        ? theme.__COLORS[component.hoveredColor]
        : theme.chart.valueHovered,
    )
    .style(
      "--component-disabled-color",
      component.disabledColor
        ? theme.__COLORS[component.disabledColor]
        : theme.chart.valueDisabled,
    )
    .append("path")
    .attr("d", drawLine(data))
    .attr("class", constants.COMPONENT_CLASSNAME);
  return $component;
}

/**
 * renderComponent
 * -----------------------------------------------------------------------
 */
export function renderComponent(
  component: types.TSchemaComponent,
  data: types.TData,
  config: types.IComponentsConfig,
) {
  switch (component["type"]) {
    case "bottom-axis":
      renderBottomAxis(component as types.IAxisComponent, config);
      break;
    case "left-axis":
      renderLeftAxis(component as types.IAxisComponent, config);
      break;
    case "right-axis":
      renderRightAxis(component as types.IAxisComponent, config);
      break;
    case "background-lines":
      renderBackgroundLines(
        component as types.IBackgroundLinesComponent,
        data,
        config,
      );
      break;
    case "vertical-bars":
      renderVerticalBars(
        component as types.IVerticalBarsComponent,
        data,
        config,
      );
      break;
    case "line":
      renderLine(component as types.ILineComponent, data, config);
      break;
  }
}

/**
 * renderComponents
 * -----------------------------------------------------------------------
 */
export function renderComponents(
  schema: types.ISchema,
  data: types.TData,
  config: types.IComponentsConfig,
) {
  config.svg.selectAll("g").remove();
  schema.components.forEach((component: types.TSchemaComponent) => {
    renderComponent(component, data, config);
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
  config: types.IComponentsConfig,
) {
  return schema.components.reduce((acc, curr) => {
    if (curr?.legend) {
      acc.push({
        color: curr.enabledColor || config.theme.chart.valueEnabled,
        label: curr.legend,
        shape: getLegendShape(curr["type"]),
      });
    }
    return acc;
  }, [] as ILegend[]);
}
