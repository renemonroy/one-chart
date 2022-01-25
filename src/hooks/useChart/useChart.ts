import { useEffect, useRef, useState } from "react";
import { useChartsStore } from "../../stores/ChartsStore/ChartsStore";
import useResizeObserver from "../useResizeObserver/useResizeObserver";
import { ISchema, TData } from "./useChart.types";
import { DEBOUNCE_DELAY } from "./useChart.constants";
import {
  calcInternalDimensions,
  generateLegends,
  generateScales,
  renderComponents,
} from "./useChart.utils";
import { select } from "d3";

export type TWrapperRef = HTMLDivElement | null;
export type TSVGRef = SVGSVGElement | null;

/**
 * useChart hook
 * --------------------------------------------------------------------
 * @description Hook that builds components of a chart through the
 * use of schemas.
 */
export default function useChart(data: TData, schema: ISchema) {
  const [{ components, scales, theme }] = useChartsStore();

  const wrapperRef = useRef<TWrapperRef>(null);
  const svgRef = useRef<TSVGRef>(null);

  const dimensions = useResizeObserver(
    wrapperRef,
    schema.debounce || DEBOUNCE_DELAY,
    [schema, data],
  );

  const [legends, setLegends] = useState<any>(null);

  useEffect(() => {
    if (data && svgRef?.current && dimensions) {
      const internalDimensions = calcInternalDimensions(dimensions, schema);
      const chart = {
        dimensions,
        internalDimensions,
        scales: generateScales(scales, internalDimensions, schema, data),
        svg: select(svgRef.current),
        theme,
        wrapperRef,
        svgRef,
        schema,
      };

      renderComponents(components, chart, data);
      setLegends(generateLegends({ schema, chart }));
    }
  }, [data, dimensions]);

  return [{ theme, legends, svgRef, wrapperRef }];
}
