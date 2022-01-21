import { ITheme } from "../../theme/theme.types";

export interface IChartsStoreState {
  theme?: ITheme;
}

export interface IChartsStoreProviderProps {
  children: any;
  theme?: ITheme;
}
