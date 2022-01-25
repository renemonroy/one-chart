import {
  extent,
  interpolateRound,
  max,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  scalePoint,
  ScalePoint,
  ScaleTime,
  scaleTime,
} from "d3";
import { IScaleConfig, TData, TDimensions, TValueName } from "./useChart.types";

export default {
  /**
   * Scale type Band
   * -----------------------------------------------------------------------
   */
  ["band"](
    { value, domain, range, size }: IScaleConfig,
    dimensions: TDimensions,
    data: TData,
  ): ScaleBand<string> {
    return scaleBand()
      .domain(domain ? domain : data.map((d) => (d as TValueName)[value]))
      .range(range ? [range[0], range[1]] : [0, size || dimensions.width]);
    // .paddingInner(gap || constants.SCALE_GAP);
  },

  /**
   * Scale type Linear
   * -----------------------------------------------------------------------
   */
  ["linear"](
    { value, domain, range }: IScaleConfig,
    dimensions: TDimensions,
    data: TData,
  ): ScaleLinear<number, number, never> {
    const maxVal = max(data, (d) => (d as TValueName)[value]);
    return scaleLinear()
      .domain(domain ? [domain[0], domain[1]] : [0, maxVal])
      .nice()
      .range(range ? [range[1], range[0]] : [dimensions.height, 0])
      .interpolate(interpolateRound);
  },

  /**
   * getScaleTime
   * -----------------------------------------------------------------------
   */
  ["time"](
    { domain, range, size, value }: IScaleConfig,
    dimensions: TDimensions,
    data: TData,
  ): ScaleTime<number, number, never> {
    return scaleTime()
      .domain(
        domain
          ? domain
          : (extent(data, (d) => new Date(d[value] as string)) as any),
      )
      .range(range ? [range[0], range[1]] : [0, size || dimensions.width]);
  },
};
