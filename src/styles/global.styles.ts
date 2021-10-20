import { createGlobalStyle } from "styled-components";
import { IProps } from "../themes/themes.types";

const GlobalStyle = createGlobalStyle`
  * {
    /* @TODO: Use a better reset */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    font-size: 16px;
  }

  html, body, #root {
    height: 100%;
    overflow: hidden;
  }

  html {
    background-color: ${({ theme }: IProps) => theme.def.backgroundColor};
  }

  body {
    font-family: ${({ theme }: IProps) => theme.def.font};
  }
`;

export default GlobalStyle;
