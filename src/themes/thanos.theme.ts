import * as constants from "./themes.constants";
import baseTheme from "./base.theme";

export default {
  ...baseTheme,
  chart: {
    valueEnabled: constants.COLORS.primary700,
    valueDisabled: constants.COLORS.primary700,
    valueHovered: constants.COLORS.primary500,
    strokeColor: constants.COLORS.primary500,
    strokeOpacity: constants.GRAPH_STROKE_OPACITY,
    strokeWidth: constants.GRAPH_STROKE_WIDTH,
    lineColor: constants.COLORS.ui700,
  },
};
