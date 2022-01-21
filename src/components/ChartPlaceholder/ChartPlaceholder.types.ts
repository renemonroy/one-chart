import { TColor } from "../../theme/theme.types";

export interface IChartPlaceholderProps {
  dimensions: DOMRect;
  hasTitle?: boolean;
  hasSubtitle?: boolean;
  hasBars?: boolean;
  hasLegends?: boolean;
  backgroundColor?: TColor;
  foregroundColor?: TColor;
}
