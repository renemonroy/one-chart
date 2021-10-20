import styled from "styled-components";
import { SUICard } from "../../ui/UICard/UICard.styles";
import * as constants from "./Chart.constants";

export const SLittChartContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const SLittChart = styled.svg`
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

  ${SUICard} & {
    text.${constants.TEXT_CLASSNAME} {
      color: ${({ theme }) => theme.card.textColor};
    }
  }

  /* &:hover g path {
    fill: var(--shape-disabled-color);
  } */

  g.${constants.CHART_VERTICAL_BARS} {
    path.${constants.SHAPE_CLASSNAME} {
      fill: var(--shape-enabled-color);
      transition: all 0.1s ease;
      stroke-opacity: 0;
      stroke-width: var(--shape-stroke-width);
    }

    &:hover {
      path.${constants.SHAPE_CLASSNAME} {
        &.hovered {
          fill: var(--shape-hovered-color);
          stroke: var(--shape-stroke-color);
          stroke-opacity: var(--shape-stroke-opacity);
          paint-order: stroke;
        }

        &:not(.hovered) {
          fill: var(--shape-disabled-color);
        }
      }

      /* & ~ g {
        path {
          fill: var(--shape-disabled-color);
        }
      } */
    }
  }

  g.${constants.CHART_LINE} {
    path.${constants.SHAPE_CLASSNAME} {
      fill: none;
      stroke-width: 3;
      stroke: var(--shape-enabled-color)};
    }
  }
`;
