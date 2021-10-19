import * as constants from "./themes.constants";

export default {
  def: {
    borderRadius: constants.BORDER_RADIUS.base,
    font: constants.FONT_FAMILY.openSans,
    fontWeight: constants.FONT_WEIGHT.normal,
    backgroundColor: constants.COLORS.uiWhite,
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
    backgroundColor: constants.COLORS.primary900,
    h4Color: constants.COLORS.uiWhite,
    subtitle2Color: constants.COLORS.ui200,
    textColor: constants.COLORS.uiWhite,
  },
  legends: {
    borderRadius: constants.BORDER_RADIUS.lg,
  },
  space: constants.SPACE, // only required here to override defaul spaces
  __COLORS: constants.COLORS,
};
