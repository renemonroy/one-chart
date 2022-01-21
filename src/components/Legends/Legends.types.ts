import { ITheme, TColor } from "../../theme/theme.types";

export type TShapeType = "dot" | "line";

export interface ILegendShapeProps {
  shapeType: TShapeType;
  shapeColor: TColor;
}

export interface IThemedLegendShape extends ILegendShapeProps {
  theme: ITheme;
}

export interface ILegend {
  color: TColor;
  label: string;
  shape: TShapeType;
}

export interface ILegendsProps {
  legendsData: ILegend[];
}
