import theme from "../../theme/theme";
import components from "../../hooks/useChart/useChart.components";
import scales from "../../hooks/useChart/useChart.scales";
import { IChartsStoreState } from "./ChartsStore.types";

export const INITIAL_STATE: IChartsStoreState = {
  components,
  scales,
  theme,
};
