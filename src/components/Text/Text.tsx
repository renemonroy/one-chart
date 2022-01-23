import React, { useContext } from "react";
import { useChartsStore } from "../../stores/ChartsStore/ChartsStore";
import { IText } from "./Text.types";
import {
  H1,
  H2,
  H3,
  H4,
  Subtitle1,
  Subtitle2,
  Body1,
  Body2,
  Caption1,
  Caption2,
} from "./Text.styles";

function Text(props: IText): JSX.Element {
  const { children, tag, weight, style, ...rest } = props;
  const [{ theme }] = useChartsStore();

  const tempStyle = {
    "--text-weight": weight || theme.def.fontWeight,
  } as React.CSSProperties;

  function getStyles(tagStyle: any) {
    return Object.assign({}, tempStyle, tagStyle, style);
  }

  switch (tag) {
    case "h1":
      return (
        <H1 style={getStyles({ "--text-size": theme.def.h1 })} {...rest}>
          {children}
        </H1>
      );
    case "h2":
      return (
        <H2 style={getStyles({ "--text-size": theme.def.h2 })} {...rest}>
          {children}
        </H2>
      );
    case "h3":
      return (
        <H3 style={getStyles({ "--text-size": theme.def.h3 })} {...rest}>
          {children}
        </H3>
      );
    case "h4":
      return (
        <H4 style={getStyles({ "--text-size": theme.def.h4 })} {...rest}>
          {children}
        </H4>
      );
    case "subtitle1":
      return (
        <Subtitle1
          style={getStyles({ "--text-size": theme.def.subtitle1 })}
          {...rest}
        >
          {children}
        </Subtitle1>
      );
    case "subtitle2":
      return (
        <Subtitle2
          style={getStyles({ "--text-size": theme.def.subtitle2 })}
          {...rest}
        >
          {children}
        </Subtitle2>
      );
    case "body2":
      return (
        <Body2 style={getStyles({ "--text-size": theme.def.body2 })} {...rest}>
          {children}
        </Body2>
      );
    case "caption1":
      return (
        <Caption1
          style={getStyles({ "--text-size": theme.def.caption1 })}
          {...rest}
        >
          {children}
        </Caption1>
      );
    case "caption2":
      return (
        <Caption2
          style={getStyles({ "--text-size": theme.def.caption2 })}
          {...rest}
        >
          {children}
        </Caption2>
      );
    case "body1":
    default:
      return (
        <Body1 style={getStyles({ "--text-size": theme.def.body1 })} {...rest}>
          {children}
        </Body1>
      );
  }
}

Text.defaultProps = {
  children: null,
  color: "uiBlack",
  tag: "body1",
  truncate: false,
  weight: "normal",
};

export default Text;
