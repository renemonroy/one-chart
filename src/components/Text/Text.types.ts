import { SpaceProps } from "styled-system";
import { ITheme, TColor, TFontWeight, TTextTag } from "../../theme/theme.types";

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
