import React from "react";
import Card from "../Card/Card";
import Legends from "../Legends/Legends";
import ChartPlaceholder from "../ChartPlaceholder/ChartPlaceholder";
import { IChartProps } from "./Chart.types";
import { SChart, SChartContainer } from "./Chart.styles";
import useChart from "../../hooks/useChart/useChart";

/**
 * Chart
 * -----------------------------------------------------------------------
 */
function Chart({ data, schema, isLoading, inCard = true }: IChartProps) {
  const [{ theme, legends, svgRef, wrapperRef }] = useChart(data, schema);
  return inCard ? (
    <Card isLoading={isLoading}>
      <Card.Header title={schema.title} subtitle={schema.subtitle}>
        {legends && <Legends legendsData={legends} />}
      </Card.Header>
      <Card.Content ref={wrapperRef}>
        <SChart ref={svgRef} id={`${schema.id}-svg`} theme={theme} />
      </Card.Content>
      <Card.Placeholder>
        {(phDimensions: DOMRect) => (
          <ChartPlaceholder
            dimensions={phDimensions}
            hasBars={true}
            hasLegends={true}
            hasTitle={true}
            hasSubtitle={true}
          />
        )}
      </Card.Placeholder>
    </Card>
  ) : (
    <SChartContainer ref={wrapperRef}>
      <SChart ref={svgRef} id={`${schema.id}-svg`} theme={theme} />
    </SChartContainer>
  );
}

export default Chart;
