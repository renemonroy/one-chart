export interface IColors {
  primary900: string;
  primary800: string;
  primary700: string;
  primary600: string;
  primary500: string;
  primary400: string;
  primary300: string;
  primary200: string;
  primary100: string;
  secondary900: string;
  secondary800: string;
  secondary700: string;
  secondary600: string;
  secondary500: string;
  secondary400: string;
  secondary300: string;
  secondary200: string;
  secondary100: string;
  supportive900: string;
  supportive800: string;
  supportive700: string;
  supportive600: string;
  supportive500: string;
  supportive400: string;
  supportive300: string;
  supportive200: string;
  supportive100: string;
  uiBlack: string;
  ui900: string;
  ui800: string;
  ui700: string;
  ui600: string;
  ui500: string;
  ui400: string;
  ui300: string;
  ui200: string;
  ui100: string;
  uiWhite: string;
  systemError: string;
  systemSuccess: string;
  systemWarning: string;
  transparent: string;
}

export type TColor =
  | "primary900"
  | "primary800"
  | "primary700"
  | "primary600"
  | "primary500"
  | "primary400"
  | "primary300"
  | "primary200"
  | "primary100"
  | "secondary900"
  | "secondary800"
  | "secondary700"
  | "secondary600"
  | "secondary500"
  | "secondary400"
  | "secondary300"
  | "secondary200"
  | "secondary100"
  | "supportive900"
  | "supportive800"
  | "supportive700"
  | "supportive600"
  | "supportive500"
  | "supportive400"
  | "supportive300"
  | "supportive200"
  | "supportive100"
  | "uiBlack"
  | "ui900"
  | "ui800"
  | "ui700"
  | "ui600"
  | "ui500"
  | "ui400"
  | "ui300"
  | "ui200"
  | "ui100"
  | "uiWhite"
  | "systemError"
  | "systemSuccess"
  | "systemWarning"
  | "transparent";

export type TBorderRadius = "base" | "lg";

export type TFont = "openSans";

export type TFontWeight = "normal" | "medium" | "bold";

export type TFontSize =
  | "xxxl"
  | "xxl"
  | "xl"
  | "lg"
  | "base"
  | "sm"
  | "xs"
  | "xxs";

export type TTextTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption1"
  | "caption2";

export interface IDef {
  backgroundColor?: TColor;
  borderRadius?: TBorderRadius;
  bulletColor?: TColor;
  font?: TFont;
  fontWeight?: number;
  textColor: TColor;
  h1?: TFontSize;
  h2?: TFontSize;
  h3?: TFontSize;
  h4?: TFontSize;
  h4Color?: TColor;
  subtitle1?: TFontSize;
  subtitle2?: TFontSize;
  subtitle2Color?: TFontSize;
  body1?: TFontSize;
  body2?: TFontSize;
  caption1?: TFontSize;
  caption2?: TFontSize;
  bulletColot?: TColor;
}

export interface IChart extends IDef {
  valueEnabled: TColor;
  valueDisabled: TColor;
  valueHovered: TColor;
  strokeColor: TColor;
  strokeOpacity: number;
  strokeWidth: number;
  lineColor: TColor;
}

export interface ITheme {
  def: IDef;
  card: IDef;
  chart: IChart;
  legends: IDef;
  space: (string | number)[];
  __COLORS: IColors;
}

export interface IProps {
  theme: ITheme;
}
