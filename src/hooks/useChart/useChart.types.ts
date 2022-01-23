import { Selection } from "d3";
import { ITheme, TColor } from "../../theme/theme.types";

/**
 * Components
 * -----------------------------------------------------------------------
 */
export interface IComponent {
  type: string;
  enabledColor?: TColor;
  disabledColor?: TColor;
  hoveredColor?: TColor;
  strokeColor?: TColor;
  strokeOpacity?: number;
  strokeWidth?: number;
  legend?: string;
  gap?: number;
}

export interface IAxisComponent extends IComponent {
  height?: number;
  width?: number;
  value: string;
  ticks: [number];
  format(value: any): string;
}

export interface IBackgroundLinesComponent extends IComponent {
  value: string;
  ticks?: number;
}

export interface IVerticalBarsComponent extends IComponent {
  barWidth?: number;
  borderRadius?: number;
  value: string[];
}

export interface ILineComponent extends IComponent {
  value: string[];
}

export type TSchemaComponent =
  | IAxisComponent
  | IBackgroundLinesComponent
  | IComponent
  | IVerticalBarsComponent;

export type ISchemaComponents = TSchemaComponent[];

export interface IComponents {
  [key: string]: any;
}

/**
 * Scales
 * -----------------------------------------------------------------------
 */
export type TDimensions = DOMRectReadOnly;

export interface IScaleConfig {
  data: TData;
  value: string;
  dimensions: TDimensions;
  domain?: string[];
  range?: [number, number];
  gap?: number;
  size?: number;
}

export type TScaleType = "band" | "linear" | "time";

export interface IScalesArgs {
  dimensions: TDimensions;
  schema: ISchema;
  data: TData;
}

/**
 * Schema
 * -----------------------------------------------------------------------
 */
export interface ISchemaValue {
  scale: TScaleType;
  domain?: string[];
  range?: [number, number];
  gap?: number;
  height?: number;
  width?: number;
}

export interface ISchemaValues {
  [key: string]: ISchemaValue;
}

export type TSVGSelection = Selection<SVGSVGElement, unknown, null, undefined>;

export type TWrapperRef = HTMLDivElement | null;

export type TSVGRef = SVGSVGElement | null;

export interface ISchema {
  id: string;
  title: string;
  subtitle?: string;
  values: ISchemaValues;
  components: ISchemaComponents;
  xAxisGap?: number;
  yAxisGap?: number;
  debounce?: number;
}

/**
 * Chart
 * -----------------------------------------------------------------------
 */
export interface IChart {
  dimensions: DOMRectReadOnly;
  internalDimensions: DOMRectReadOnly;
  scales: ISchemaValues;
  svg: TSVGSelection;
  theme: ITheme;
  wrapperRef: React.MutableRefObject<TWrapperRef>;
  svgRef: React.MutableRefObject<TSVGRef>;
  schema: ISchema;
}

/**
 * Data
 * -----------------------------------------------------------------------
 */
export interface IDataValue {
  [key: string]: number | string | (number | string)[];
}

export type TData = IDataValue[];

export type TValueName = Record<string, any>;

/**
 * Legends
 * -----------------------------------------------------------------------
 */
export interface ILegendsArgs {
  schema: ISchema;
  chart: IChart;
}
