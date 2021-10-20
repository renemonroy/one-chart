import React from "react";
import { ThemeProvider } from "styled-components";
import { IUIProviderProps } from "./UIProvider.types";
import allThemes from "../../themes/themes";
import GlobalStyle from "../../styles/global.styles";

function UIProvider(props: IUIProviderProps) {
  const { children, theme = "thanos" } = props;
  return (
    <ThemeProvider theme={allThemes[theme]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default UIProvider;
