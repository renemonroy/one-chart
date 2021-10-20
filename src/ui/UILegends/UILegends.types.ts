import { ITheme, TColor } from "../../themes/themes.types";

export type TShapeType = "dot" | "line";

export interface ILegendShapeProps {
  shapeType: TShapeType;
  shapeColor: TColor;
}

export interface IThemedLegendShape extends ILegendShapeProps {
  theme: ITheme;
}

export interface IUILegend {
  color: TColor;
  label: string;
  shape: TShapeType;
}

export interface IUILegendsProps {
  legendsData: IUILegend[];
}
