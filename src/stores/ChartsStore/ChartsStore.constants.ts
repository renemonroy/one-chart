import theme from "../../theme/theme";
import components from "../../hooks/useChart/useChart.components";
import { IChartsStoreState } from "./ChartsStore.types";

export const INITIAL_STATE: IChartsStoreState = {
  theme,
  components,
};
