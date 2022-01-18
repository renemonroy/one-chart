import { TColor } from "../../themes/themes.types";

export interface IChartPlaceholderProps {
  dimensions: DOMRect;
  hasTitle?: boolean;
  hasSubtitle?: boolean;
  hasBars?: boolean;
  hasLegends?: boolean;
  backgroundColor?: TColor;
  foregroundColor?: TColor;
}
