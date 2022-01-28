import styled from "styled-components";
import { SCard } from "../Card/Card.styles";
import * as constants from "../../hooks/useChart/useChart.constants";

export const SChartContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1.5rem;
`;

export const SChart = styled.svg`
  display: block;
  height: 100%;
  overflow: visible;
  width: 100%;

  text.${constants.TEXT_CLASSNAME} {
    color: ${({ theme }) => theme.def.textColor};
    font-size: ${({ theme }) => theme.def.caption2};
  }

  path.${constants.BG_LINE_CLASSNAME} {
    stroke: ${({ theme }) => theme.chart.lineColor};
  }

  ${SCard} & {
    text.${constants.TEXT_CLASSNAME} {
      color: ${({ theme }) => theme.card.textColor};
    }
  }

  /* &:hover g path {
    fill: var(--component-disabled-color);
  } */

  g.${constants.CHART_VERTICAL_BARS},
  g.${constants.CHART_DOTS} {
    path.${constants.COMPONENT_CLASSNAME} {
      fill: var(--component-enabled-color);
      transition: all 0.1s ease;
      stroke-opacity: 0;
      stroke-width: var(--component-stroke-width);
    }

    &:hover {
      path.${constants.COMPONENT_CLASSNAME} {
        &.hovered {
          fill: var(--component-hovered-color);
          stroke: var(--component-stroke-color);
          stroke-opacity: var(--component-stroke-opacity);
          paint-order: stroke;
        }

        &:not(.hovered) {
          fill: var(--component-disabled-color);
        }
      }

      /* & ~ g {
        path {
          fill: var(--component-disabled-color);
        }
      } */
    }
  }

  g.${constants.CHART_LINE} {
    path.${constants.COMPONENT_CLASSNAME} {
      fill: none;
      stroke-width: 3;
      stroke: var(--component-enabled-color)};
    }
  }
`;
