import React from "react";
import { ThemeProvider } from "styled-components";
import { IChartsProviderProps } from "./ChartsProvider.types";
import allThemes from "../../themes/themes";
import GlobalStyle from "../../styles/global.styles";

function ChartsProvider(props: IChartsProviderProps) {
  const { children, theme = "thanos" } = props;
  return (
    <ThemeProvider theme={allThemes[theme]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default ChartsProvider;
