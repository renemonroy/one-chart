import * as constants from "./themes.constants";
import baseTheme from "./base.theme";

export default {
  ...baseTheme,
  chart: {
    valueEnabled: constants.COLORS.supportive500,
    valueDisabled: constants.COLORS.supportive700,
    valueHovered: constants.COLORS.supportive500,
    strokeColor: constants.COLORS.supportive500,
    strokeOpacity: constants.GRAPH_STROKE_OPACITY,
    strokeWidth: constants.GRAPH_STROKE_WIDTH,
    lineColor: constants.COLORS.ui700,
  },
};
