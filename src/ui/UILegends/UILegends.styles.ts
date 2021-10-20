import styled, { css } from "styled-components";
import { space } from "styled-system";
import { Caption2 } from "../UIText/UIText.styles";

export const SUILegends = styled.div`
  display: flex;
  flex-direction: row;
  align-items: right;
  justify-content: center;
  ${space}

  ${Caption2} {
    align-items: center;
    display: flex;
    margin-left: 1.25rem;
  }
`;

export const SDotLegendStyles = css`
  --border-radius: ${({ theme }) => theme.legends.borderRadius};
  background-color: var(--shape-color);
  border-radius: var(--border-radius);
  display: inline-block;
  margin-right: 0.5rem;
`;

export const SDotLegendShape = styled.span`
  height: calc(var(--border-radius) / 2);
  width: calc(var(--border-radius) / 2);
  ${SDotLegendStyles}
`;

export const SLineLegendShape = styled.span`
  height: calc(var(--border-radius) / 4);
  width: var(--border-radius);
  ${SDotLegendStyles}
`;
