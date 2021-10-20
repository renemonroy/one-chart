import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { select } from "d3";
import { ITheme } from "../../themes/themes.types";
import useResizeObserver from "../../hooks/useResizeObserver/useResizeObserver";
import UICard from "../../ui/UICard/UICard";
import UILegends from "../../ui/UILegends/UILegends";
import UIChartPlaceholder from "../../ui/UIChartPlaceholder/UIChartPlaceholder";
import * as types from "./Chart.types";
import * as utils from "./Chart.utils";
import * as constants from "./Chart.constants";
import { SLittChart } from "./Chart.styles";

/**
 * UIChart
 * -----------------------------------------------------------------------
 */
function UIChart({ schema, data, isLoading = true }: types.ILittChartProps) {
  const theme = useTheme() as ITheme;
  const wrapperRef = useRef<types.TWrapperRef>(null);
  const svgRef = useRef<types.TSVGRef>(null);
  const dimensions = useResizeObserver(
    wrapperRef,
    schema.debounce || constants.DEBOUNCE_DELAY,
    [schema, data, isLoading],
  );
  const [legends, setLegends] = useState<any>(null);

  useEffect(() => {
    if (data && svgRef?.current && dimensions) {
      const intDimensions = utils.getInternalDimensions(dimensions, schema);
      const config = {
        dimensions,
        internalDimensions: intDimensions,
        scales: utils.buildScales(intDimensions, schema, data),
        svg: select(svgRef.current),
        theme,
        wrapperRef,
        svgRef,
        schema,
      };

      utils.renderGraphs(schema, data, config);
      setLegends(utils.buildLegends(schema, config));
    }
  }, [data, dimensions]);

  return (
    <UICard isLoading={isLoading}>
      <UICard.Header title={schema.title} subtitle={schema.subtitle}>
        {legends && <UILegends legendsData={legends} />}
      </UICard.Header>
      <UICard.Content ref={wrapperRef}>
        <SLittChart ref={svgRef} id={`${schema.id}-svg`} theme={theme} />
      </UICard.Content>
      <UICard.Placeholder>
        {(phDimensions: DOMRect) => (
          <UIChartPlaceholder
            dimensions={phDimensions}
            hasBars={true}
            hasLegends={true}
            hasTitle={true}
            hasSubtitle={true}
          />
        )}
      </UICard.Placeholder>
    </UICard>
  );
}

export default UIChart;
