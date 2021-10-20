import {
  ITheme,
  TColor,
  TFontWeight,
  TTextTag,
} from "../../themes/themes.types";
import { SpaceProps } from "styled-system";

export interface IUIText extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  tag?: TTextTag;
  truncate?: boolean;
  weight?: TFontWeight;
}

export interface IThemedUIText extends IUIText {
  theme: ITheme;
}

export interface IUITextStyle {
  color: TColor;
  weight: TFontWeight;
}
