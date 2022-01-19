import * as constants from "./themes.constants";
import baseTheme from "./base.theme";

export default {
  ...baseTheme,
  chart: {
    valueEnabled: constants.COLORS.primary800,
    valueDisabled: constants.COLORS.primary900,
    valueHovered: constants.COLORS.primary700,
    strokeColor: constants.COLORS.primary800,
    strokeOpacity: constants.GRAPH_STROKE_OPACITY,
    strokeWidth: constants.GRAPH_STROKE_WIDTH,
    lineColor: constants.COLORS.ui700,
  },
};
