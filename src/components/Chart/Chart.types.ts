import { Selection } from "d3";
import { ITheme, TColor } from "../../themes/themes.types";

export type TValueName = Record<string, any>;
export interface IY {
  value: "string";
  domain: number[];
  range: number[];
}

export interface IX {
  value: string;
  domain?: string[];
  range?: [number, number];
  gap?: number;
  height?: number;
}

export interface TValue {
  graph: "rect" | "line";
}

export interface TValues {
  [key: string]: TValue;
}

export interface IValueStyle {
  primaryColor: string;
  secondaryColor: string;
}

export interface IBar {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number | string;
}

/**
 * Graph Utils
 * ---------------------------------------------------------------
 */
export interface IScaleConfig {
  data: TData;
  value: string;
  dimensions: DOMRectReadOnly;
  domain?: string[];
  range?: [number, number];
  gap?: number;
  size?: number;
}

/**
 * Graph Data
 * ---------------------------------------------------------------
 */

export interface IDataValue {
  [key: string]: number | string | (number | string)[];
}

export type TData = IDataValue[];

/**
 * Graph Schema
 * ---------------------------------------------------------------
 */

export type TScaleType = "band" | "linear" | "time";

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

export type TComponentsType =
  | "bottom-axis"
  | "left-axis"
  | "right-axis"
  | "vertical-bars"
  | "background-lines"
  | "line";

export interface IComponent {
  type: TComponentsType;
  enabledColor?: TColor;
  disabledColor?: TColor;
  hoveredColor?: TColor;
  strokeColor?: TColor;
  strokeOpacity?: number;
  strokeWidth?: number;
  legend?: string;
  gap?: number;
}

export interface IVerticalBarsComponent extends IComponent {
  borderRadius?: number;
  value: string[];
}

export interface ILineComponent extends IComponent {
  value: string[];
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

export type TSchemaComponent =
  | IVerticalBarsComponent
  | IAxisComponent
  | IBackgroundLinesComponent
  | IComponent;

export type ISchemaComponents = TSchemaComponent[];

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
 * Graph Props
 * ---------------------------------------------------------------
 */

export interface ILittChartProps {
  data: TData;
  schema: ISchema;
  isLoading: boolean;
}

/**
 * Graph Elements
 * ---------------------------------------------------------------
 */

export type TWrapperRef = HTMLDivElement | null;

export type TSVGRef = SVGSVGElement | null;

export type TSVGSelection = Selection<SVGSVGElement, unknown, null, undefined>;

export interface IComponentsConfig {
  dimensions: DOMRectReadOnly;
  internalDimensions: DOMRectReadOnly;
  scales: ISchemaValues;
  svg: TSVGSelection;
  theme: ITheme;
  wrapperRef: React.MutableRefObject<TWrapperRef>;
  svgRef: React.MutableRefObject<TSVGRef>;
  schema: ISchema;
}
