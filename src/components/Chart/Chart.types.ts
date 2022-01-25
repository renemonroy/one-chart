import { TData, ISchema } from "../../hooks/useChart/useChart.types";

/**
 * Graph Props
 * ---------------------------------------------------------------
 */
export interface IChartProps {
  data: TData;
  schema: ISchema;
  isLoading: boolean;
  inCard: boolean;
}
