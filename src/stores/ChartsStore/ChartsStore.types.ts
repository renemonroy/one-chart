import { IComponents } from "../../hooks/useChart/useChart.types";
import { ITheme } from "../../theme/theme.types";

export interface IChartsStoreState {
  theme: ITheme;
  components: IComponents;
}

export interface IChartsStoreProviderProps {
  children: any;
  theme?: ITheme;
  components?: IComponents;
}
