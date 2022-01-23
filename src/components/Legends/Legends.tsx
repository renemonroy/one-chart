import React from "react";
import { useChartsStore } from "../../stores/ChartsStore/ChartsStore";
import Text from "../Text/Text";
import { ILegendShapeProps, ILegendsProps } from "./Legends.types";
import { SLegends, SDotLegendShape, SLineLegendShape } from "./Legends.styles";
import { COLORS } from "../../theme/theme.constants";

/**
 * Legend Shape
 * ----------------------------------------------------------------
 */
function LegendShape(props: ILegendShapeProps) {
  const { shapeType, shapeColor } = props;
  const [{ theme }] = useChartsStore();
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
 * Legends
 * ----------------------------------------------------------------
 */
function Legends(props: ILegendsProps): JSX.Element {
  const { legendsData } = props;
  const [{ theme }] = useChartsStore();
  const legendsStyle = {
    "--legends-color": theme.def.textColor,
  } as React.CSSProperties;
  return (
    <SLegends style={legendsStyle}>
      {legendsData.map((legend, i) => (
        <Text key={`legend-${i}`} tag="caption2">
          <LegendShape shapeType={legend.shape} shapeColor={legend.color} />
          {legend.label}
        </Text>
      ))}
    </SLegends>
  );
}

Legends.defaultProps = {
  legendsData: [],
};

export default Legends;
