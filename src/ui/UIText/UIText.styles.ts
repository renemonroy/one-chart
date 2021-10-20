import styled, { css } from "styled-components";
import { space } from "styled-system";
import { IThemedUIText } from "./UIText.types";
import { SUICardHeader, SUICardContent } from "../UICard/UICard.styles";

function truncateText(truncate: boolean) {
  return truncate
    ? css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `
    : "";
}

const TextStyles = css`
  color: ${({ theme }: IThemedUIText) => theme.def.textColor};
  font-size: var(--text-size);
  font-weight: var(--text-weight);
  ${({ truncate = false }: IThemedUIText) => truncateText(truncate)}
  ${space}

  ${SUICardContent} & {
    color: var(--graph-card-content-color);
  }
`;

/**
 * H1 styles
 * ----------------------------------------------------------------
 */

export const H1 = styled.h1`
  ${TextStyles}
`;

/**
 * H2 styles
 * ----------------------------------------------------------------
 */

export const H2 = styled.h2`
  ${TextStyles}
`;

/**
 * H3 styles
 * ----------------------------------------------------------------
 */
export const H3 = styled.h3`
  ${TextStyles}
`;

/**
 * H4 styles
 * ----------------------------------------------------------------
 */
export const H4 = styled.h4`
  ${TextStyles}

  ${SUICardHeader} & {
    color: var(--title-color);
  }
`;

/**
 * Subtitle1 styles
 * ----------------------------------------------------------------
 */
export const Subtitle1 = styled.span`
  display: inline-block;
  ${TextStyles}
`;

/**
 * Subtitle2 styles
 * ----------------------------------------------------------------
 */
export const Subtitle2 = styled.span`
  display: inline-block;
  ${TextStyles}

  ${SUICardHeader} & {
    color: var(--subtitle-color);
    margin-top: 0.125rem;
  }
`;

/**
 * Body1 styles
 * ----------------------------------------------------------------
 */
export const Body1 = styled.p`
  ${TextStyles}
`;

/**
 * Body2 styles
 * ----------------------------------------------------------------
 */
export const Body2 = styled.p`
  ${TextStyles}
`;

/**
 * Caption1 styles
 * ----------------------------------------------------------------
 */
export const Caption1 = styled.span`
  display: inline-block;
  ${TextStyles}
`;

/**
 * Caption2 styles
 * ----------------------------------------------------------------
 */
export const Caption2 = styled.span`
  display: inline-block;
  ${TextStyles}

  ${SUICardHeader} & {
    color: var(--graph-card-content-color);
    padding: 0.125rem 0;
  }
`;
