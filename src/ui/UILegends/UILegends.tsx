import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import UIText from "../UIText/UIText";
import { ILegendShapeProps, IUILegendsProps } from "./UILegends.types";
import {
  SUILegends,
  SDotLegendShape,
  SLineLegendShape,
} from "./UILegends.styles";
import { COLORS } from "../../themes/themes.constants";

/**
 * Legend Shape
 * ----------------------------------------------------------------
 */
function LegendShape(props: ILegendShapeProps) {
  const { shapeType, shapeColor } = props;
  const theme = useContext(ThemeContext);
  const shapeStyle = {
    "--shape-color": COLORS[shapeColor] || theme.def.bulletColor,
  } as React.CSSProperties;
  switch (shapeType) {
    case "line":
      return <SLineLegendShape style={shapeStyle} />;
    case "dot":
    default:
      return <SDotLegendShape style={shapeStyle} />;
  }
}

LegendShape.defaultProps = {
  shapeType: "dot",
};

/**
 * UILegends
 * ----------------------------------------------------------------
 */
function UILegends(props: IUILegendsProps): JSX.Element {
  const { legendsData } = props;
  const theme = useContext(ThemeContext);
  const legendsStyle = {
    "--legends-color": theme.def.textColor,
  } as React.CSSProperties;
  return (
    <SUILegends style={legendsStyle}>
      {legendsData.map((legend, i) => (
        <UIText key={`legend-${i}`} tag="caption2">
          <LegendShape shapeType={legend.shape} shapeColor={legend.color} />
          {legend.label}
        </UIText>
      ))}
    </SUILegends>
  );
}

UILegends.defaultProps = {
  legendsData: [],
};

export default UILegends;
