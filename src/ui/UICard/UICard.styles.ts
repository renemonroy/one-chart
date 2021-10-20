import styled, { css } from "styled-components";
import { space } from "styled-system";

const sharedStyles = css`
  display: flex;
  ${space}
`;

/**
 * UICard Content styles
 * ----------------------------------------------------------------
 */

export const SUICard = styled.div`
  background-color: var(--bg-color);
  border-radius: ${({ theme }) => theme.def.borderRadius};
  flex-direction: column;
  height: 100%;
  ${sharedStyles}

  & > *:first-child {
    padding-top: 1.5rem;
  }
`;

/**
 * UICard Header styles
 * ----------------------------------------------------------------
 */

export const SUICardHeader = styled.header`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1.5rem 1.5rem;
  ${sharedStyles}

  & > * {
    flex: 1;
  }
`;

export const SUICardHeaderLeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SUICardHeaderRightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

/**
 * UICard Content styles
 * ----------------------------------------------------------------
 */

export const SUICardContent = styled.div`
  align-items: center;
  flex: 1;
  flex-direction: column;
  padding: 0 1.5rem 1.5rem;
  ${sharedStyles}
`;

/**
 * UICard Placeholder styles
 * ----------------------------------------------------------------
 */

export const SUICardPlaceholder = styled.div`
  flex-direction: column;
  height: 100%;
  ${sharedStyles}

  ${SUICard} & {
    padding-top: 0;
  }
`;
