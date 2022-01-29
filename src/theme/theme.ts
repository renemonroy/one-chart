import * as constants from "./theme.constants";
import { ITheme } from "./theme.types";

export default {
  def: {
    backgroundColor: constants.COLORS.uiWhite,
    borderRadius: constants.BORDER_RADIUS.base,
    font: constants.FONT_FAMILY.openSans,
    fontWeight: constants.FONT_WEIGHT.normal,
    textColor: constants.COLORS.uiBlack,
    h1: constants.FONT_SIZE.xxxl,
    h2: constants.FONT_SIZE.xxl,
    h3: constants.FONT_SIZE.lg,
    h4: constants.FONT_SIZE.base,
    subtitle1: constants.FONT_SIZE.base,
    subtitle2: constants.FONT_SIZE.xs,
    body1: constants.FONT_SIZE.base,
    body2: constants.FONT_SIZE.sm,
    caption1: constants.FONT_SIZE.sm,
    caption2: constants.FONT_SIZE.xs,
    bulletColor: constants.COLORS.primary500,
  },
  card: {
    backgroundColor: constants.COLORS.uiBlack,
    h4Color: constants.COLORS.uiWhite,
    subtitle2Color: constants.COLORS.ui200,
    textColor: constants.COLORS.uiWhite,
  },
  legends: {
    borderRadius: constants.BORDER_RADIUS.lg,
  },
  space: constants.SPACE, // only required here to override default spaces
  chart: {
    valueEnabled: constants.COLORS.primary800,
    valueDisabled: constants.COLORS.primary900,
    valueHovered: constants.COLORS.primary700,
    strokeEnabledColor: constants.COLORS.transparent,
    strokeDisabledColor: constants.COLORS.transparent,
    strokeHoveredColor: constants.COLORS.primary600,
    strokeEnabledOpacity: constants.GRAPH_STROKE_OPACITY,
    strokeDisabledOpacity: constants.GRAPH_STROKE_OPACITY,
    strokeHoveredOpacity: constants.GRAPH_STROKE_OPACITY,
    strokeWidth: constants.GRAPH_STROKE_WIDTH,
    lineColor: constants.COLORS.ui700,
  },
  __COLORS: constants.COLORS,
} as ITheme;
