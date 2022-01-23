import React from "react";
import ContentLoader from "react-content-loader";
import {
  PADDING,
  EXTRA_PADDING_BOTTOM,
  BG_COLOR,
  FG_COLOR,
} from "./ChartPlaceholder.constants";
import { IChartPlaceholderProps } from "./ChartPlaceholder.types";
import { useChartsStore } from "../../stores/ChartsStore/ChartsStore";

function ChartPlaceholder({
  dimensions,
  hasBars = false,
  hasLegends = false,
  hasSubtitle = false,
  hasTitle = false,
  backgroundColor = BG_COLOR,
  foregroundColor = FG_COLOR,
}: IChartPlaceholderProps) {
  const [{ theme }] = useChartsStore();
  const { height, width } = dimensions;
  const plx = PADDING;
  const prx = width - plx;
  const cx = width / 2;
  const pby = height - plx - EXTRA_PADDING_BOTTOM;
  const barW = 90;
  const barS = 16;
  return (
    <ContentLoader
      speed={3}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={theme.__COLORS[backgroundColor]}
      foregroundColor={theme.__COLORS[foregroundColor]}
    >
      {hasTitle && (
        <rect x={plx} y="28" rx="4" ry="4" width="140" height="16" />
      )}
      {hasSubtitle && (
        <rect x={plx} y="52" rx="4" ry="4" width="261" height="10" />
      )}
      {hasLegends && (
        <>
          <circle cx={prx - 90 - 10} cy="34" r="4" />
          <rect x={prx - 90} y="29" rx="4" ry="4" width="90" height="10" />
        </>
      )}
      {hasBars && (
        <>
          <rect
            x={cx - barW - barW / 2 - barS}
            y={pby - 90}
            rx="4"
            ry="4"
            width={barW}
            height="90"
          />
          <rect
            x={cx - barW / 2}
            y={pby - 160}
            rx="4"
            ry="4"
            width={barW}
            height="160"
          />
          <rect
            x={cx + barW / 2 + barS}
            y={pby - 120}
            rx="4"
            ry="4"
            width={barW}
            height="120"
          />
        </>
      )}
    </ContentLoader>
  );
}

export default ChartPlaceholder;
