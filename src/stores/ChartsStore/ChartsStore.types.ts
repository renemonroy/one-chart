import { IComponents, IScales } from "../../hooks/useChart/useChart.types";
import { ITheme } from "../../theme/theme.types";

export interface IChartsStoreState {
  theme: ITheme;
  components: IComponents;
  scales: IScales;
}

export interface IChartsStoreProviderProps {
  children: any;
  theme?: ITheme;
  components?: IComponents;
  scales?: IScales;
}
