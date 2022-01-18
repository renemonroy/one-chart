import {
  ITheme,
  TColor,
  TFontWeight,
  TTextTag,
} from "../../themes/themes.types";
import { SpaceProps } from "styled-system";

export interface IText extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  tag?: TTextTag;
  truncate?: boolean;
  weight?: TFontWeight;
}

export interface IThemedText extends IText {
  theme: ITheme;
}

export interface ITextStyle {
  color: TColor;
  weight: TFontWeight;
}
