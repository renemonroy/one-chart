import React, { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import merge from "lodash/merge";
import {
  IChartsStoreState,
  IChartsStoreProviderProps,
} from "./ChartsStore.types";
import GlobalStyle from "../../styles/global.styles";
import { INITIAL_STATE } from "./ChartsStore.constants";

/**
 * Charts Context
 * --------------------------------------------------------------------
 * @description Creates a store for Charts
 */
const ChartsContext = createContext<IChartsStoreState>(INITIAL_STATE);

/**
 * Charts Provider
 * --------------------------------------------------------------------
 * @description Creates a Provider for the Charts Store
 */
export function ChartsProvider({ children, theme }: IChartsStoreProviderProps) {
  const state = merge({}, INITIAL_STATE, theme && { theme });
  return (
    <ChartsContext.Provider value={state}>
      <ThemeProvider theme={state.theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ChartsContext.Provider>
  );
}

/**
 * Charts Consumer Hook
 * --------------------------------------------------------------------
 * @description Creates a hook instead of exporting a Consumer
 */
export function useCharts(): [IChartsStoreState] {
  const state = useContext(ChartsContext);

  return [state];
}
