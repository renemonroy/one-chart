import {
  extent,
  interpolateRound,
  max,
  scaleBand,
  scaleLinear,
  scaleTime,
} from "d3";
import { IScaleConfig, TValueName } from "./useChart.types";

export default {
  /**
   * Scale type Band
   * -----------------------------------------------------------------------
   */
  ["band"]({ data, dimensions, value, domain, range, size }: IScaleConfig) {
    return scaleBand()
      .domain(domain ? domain : data.map((d) => (d as TValueName)[value]))
      .range(range ? [range[0], range[1]] : [0, size || dimensions.width]);
    // .paddingInner(gap || constants.SCALE_GAP);
  },

  /**
   * Scale type Linear
   * -----------------------------------------------------------------------
   */
  ["linear"]({ dimensions, data, value, domain, range }: IScaleConfig) {
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
  ["time"]({ data, dimensions, domain, range, size, value }: IScaleConfig) {
    return scaleTime()
      .domain(
        domain
          ? domain
          : (extent(data, (d) => new Date(d[value] as string)) as any),
      )
      .range(range ? [range[0], range[1]] : [0, size || dimensions.width]);
  },
};
