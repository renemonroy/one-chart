import { ILegend } from "../../components/Legends/Legends.types";
import {
  IAxisComponent,
  IChart,
  IComponents,
  ILegendsArgs,
  IScales,
  ISchema,
  ISchemaComponents,
  TData,
  TDimensions,
  TSchemaComponent,
} from "./useChart.types";
import {
  AXIS_WIDTH,
  AXIS_HEIGHT,
  X_AXIS_SPACE,
  Y_AXIS_SPACE,
} from "./useChart.constants";

/**
 * getAxisComponents
 * -----------------------------------------------------------------------
 */
export function getAxisComponents(components: ISchemaComponents) {
  return components.filter((component) =>
    component["type"].includes("-axis"),
  ) as IAxisComponent[];
}

/**
 * calcInternalDimensions
 * -----------------------------------------------------------------------
 */
export function calcInternalDimensions(
  dimensions: DOMRectReadOnly,
  schema: ISchema,
) {
  const { height, width } = dimensions;
  const { components } = schema;
  const xGap = schema.xAxisGap || X_AXIS_SPACE;
  const yGap = schema.yAxisGap || Y_AXIS_SPACE;
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
 * generateLegends
 * -----------------------------------------------------------------------
 */
export function generateLegends({
  schema: { components },
  chart: { theme },
}: ILegendsArgs) {
  return components.reduce((acc, curr) => {
    if (curr?.legend) {
      acc.push({
        color: curr.enabledColor || theme.chart.valueEnabled,
        label: curr.legend,
        shape: getLegendShape(curr["type"]),
      });
    }
    return acc;
  }, [] as ILegend[]);
}

/**
 * generateScales
 * -----------------------------------------------------------------------
 */
export function generateScales(
  scales: IScales,
  dimensions: TDimensions,
  schema: ISchema,
  data: TData,
) {
  const { values } = schema;
  return Object.keys(values).reduce((acc, curr) => {
    const { scale, ...rest } = values[curr];
    const config = { ...rest, dimensions, value: curr };
    acc[curr] = scales[scale](config, dimensions, data);
    return acc;
  }, {} as any); // @ToDo: Figure the type instead "any"
}

/**
 * renderComponents
 * -----------------------------------------------------------------------
 */
export function renderComponents(
  components: IComponents,
  chart: IChart,
  data: TData,
) {
  const { svg, schema } = chart;
  svg.selectAll("g").remove();
  schema.components.forEach((component: TSchemaComponent) => {
    components[component["type"]](component, chart, data);
  });
}
