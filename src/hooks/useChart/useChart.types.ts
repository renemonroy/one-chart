import {
  Selection,
  ScaleBand,
  ScaleDiverging,
  ScaleIdentity,
  ScaleLinear,
  ScaleOrdinal,
  ScalePoint,
  ScaleQuantile,
  ScaleQuantize,
  ScaleRadial,
  ScaleSequential,
  ScaleThreshold,
  ScaleTime,
} from "d3";
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
  strokeEnabledColor?: TColor;
  strokeDisabledColor?: TColor;
  strokeHoveredColor?: TColor;
  strokeEnabledOpacity?: number;
  strokeDisabledOpacity?: number;
  strokeHoveredOpacity?: number;
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
  [key: string]: any;
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

export interface IDotsComponent extends IComponent {
  dotWidth?: number;
  value: string[];
}

export type TSchemaComponent =
  | IAxisComponent
  | IBackgroundLinesComponent
  | IComponent
  | IVerticalBarsComponent;

export type ISchemaComponents = TSchemaComponent[];

export interface IComponents {
  [key: string]: (
    component?: TSchemaComponent,
    chart?: IChart,
    data?: TData,
  ) => void;
}

/**
 * Scales
 * -----------------------------------------------------------------------
 */
export type TDimensions = DOMRectReadOnly;

export interface IScaleConfig {
  value: string;
  domain?: string[];
  range?: [number, number];
  gap?: number;
  size?: number;
  orientation?: "horizontal" | "vertical";
}

export type TScaleType = "band" | "linear" | "time";

export interface IScales {
  [key: string]: (
    scale: IScaleConfig,
    dimensions: TDimensions,
    data: TData,
  ) =>
    | ScaleBand<string>
    | ScaleDiverging<number, never>
    | ScaleIdentity<never>
    | ScaleLinear<number, number, never>
    | ScaleOrdinal<string, unknown, never>
    | ScalePoint<string>
    | ScaleQuantize<number, never>
    | ScaleQuantile<number, never>
    | ScaleRadial<number, never>
    | ScaleSequential<number, never>
    | ScaleThreshold<number, number, never>
    | ScaleTime<number, number, never>;
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
