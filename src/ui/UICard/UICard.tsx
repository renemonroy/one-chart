import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ThemeContext } from "styled-components";
import { INITIAL_STATE } from "./UICard.constants";
import {
  SUICard,
  SUICardContent,
  SUICardHeader,
  SUICardPlaceholder,
  SUICardHeaderLeftSide,
  SUICardHeaderRightSide,
} from "./UICard.styles";
import {
  IUICardContentProps,
  IUICardHeaderProps,
  IUICardPlaceholderProps,
  IUICardProps,
  IUICardContext,
} from "./UICard.types";
import UIText from "../UIText/UIText";

const CardContext = createContext<IUICardContext>(INITIAL_STATE);

/**
 * UICard.Header
 * ----------------------------------------------------------------
 */
function Header(props: IUICardHeaderProps) {
  const { title, subtitle, children } = props;
  const theme = useContext(ThemeContext);
  const { isLoading } = useContext(CardContext);
  const titleStyle = {
    "--title-color": theme.card.h4Color,
    "--subtitle-color": theme.card.subtitle2Color,
    "--graph-card-content-color": theme.card.textColor,
  } as React.CSSProperties;
  return !isLoading ? (
    <SUICardHeader style={titleStyle}>
      <SUICardHeaderLeftSide>
        {title && <UIText tag="h4">{title}</UIText>}
        {subtitle && <UIText tag="subtitle2">{subtitle}</UIText>}
      </SUICardHeaderLeftSide>
      {children && <SUICardHeaderRightSide>{children}</SUICardHeaderRightSide>}
    </SUICardHeader>
  ) : null;
}

/**
 * UICard.Content
 * ----------------------------------------------------------------
 */
function Content(props: IUICardContentProps, ref?: React.Ref<HTMLDivElement>) {
  const { children } = props;
  const theme = useContext(ThemeContext);
  const { isLoading } = useContext(CardContext);
  const contentStyle = {
    "--graph-card-content-color": theme.card.textColor,
  } as React.CSSProperties;
  return !isLoading ? (
    <SUICardContent ref={ref} style={contentStyle}>
      {children}
    </SUICardContent>
  ) : null;
}

/**
 * UICard.Placeholder
 * ----------------------------------------------------------------
 */
function Placeholder(props: IUICardPlaceholderProps) {
  const { children } = props;
  const { isLoading } = useContext(CardContext);
  const ref = useRef(null);
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current && ref.current !== el) {
      setEl(ref.current);
    }
  }, [ref.current]);
  return isLoading ? (
    <SUICardPlaceholder ref={ref}>
      {el && children(el.getBoundingClientRect())}
    </SUICardPlaceholder>
  ) : null;
}

/**
 * UICard
 * ----------------------------------------------------------------
 */
function UICard(props: IUICardProps): JSX.Element {
  const { children, ...rest } = props;
  const theme = useContext(ThemeContext);
  const value = useMemo(() => ({ ...rest }), [props.children, props.isLoading]);
  const cardStyle = {
    "--bg-color": theme.card.backgroundColor,
  } as React.CSSProperties;
  return (
    <CardContext.Provider value={value}>
      <SUICard style={cardStyle}>{children}</SUICard>
    </CardContext.Provider>
  );
}

UICard.defaultProps = {
  children: () => null,
  isLoading: true,
};

UICard.Header = Header;
UICard.Content = forwardRef(Content);
UICard.Placeholder = Placeholder;

export default UICard;
