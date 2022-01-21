import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCharts } from "../../stores/ChartsStore/ChartsStore";
import { INITIAL_STATE } from "./Card.constants";
import {
  SCard,
  SCardContent,
  SCardHeader,
  SCardPlaceholder,
  SCardHeaderLeftSide,
  SCardHeaderRightSide,
} from "./Card.styles";
import {
  ICardContentProps,
  ICardHeaderProps,
  ICardPlaceholderProps,
  ICardProps,
  ICardContext,
} from "./Card.types";
import Text from "../Text/Text";

const CardContext = createContext<ICardContext>(INITIAL_STATE);

/**
 * Card.Header
 * ----------------------------------------------------------------
 */
function Header(props: ICardHeaderProps) {
  const { title, subtitle, children } = props;

  const [{ theme }] = useCharts();
  const { isLoading } = useContext(CardContext);
  const titleStyle = {
    "--title-color": theme.card.h4Color,
    "--subtitle-color": theme.card.subtitle2Color,
    "--graph-card-content-color": theme.card.textColor,
  } as React.CSSProperties;
  return !isLoading ? (
    <SCardHeader style={titleStyle}>
      <SCardHeaderLeftSide>
        {title && <Text tag="h4">{title}</Text>}
        {subtitle && <Text tag="subtitle2">{subtitle}</Text>}
      </SCardHeaderLeftSide>
      {children && <SCardHeaderRightSide>{children}</SCardHeaderRightSide>}
    </SCardHeader>
  ) : null;
}

/**
 * Card.Content
 * ----------------------------------------------------------------
 */
function Content(props: ICardContentProps, ref?: React.Ref<HTMLDivElement>) {
  const { children } = props;
  const [{ theme }] = useCharts();
  const { isLoading } = useContext(CardContext);
  const contentStyle = {
    "--graph-card-content-color": theme.card.textColor,
  } as React.CSSProperties;
  return !isLoading ? (
    <SCardContent ref={ref} style={contentStyle}>
      {children}
    </SCardContent>
  ) : null;
}

/**
 * Card.Placeholder
 * ----------------------------------------------------------------
 */
function Placeholder(props: ICardPlaceholderProps) {
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
    <SCardPlaceholder ref={ref}>
      {el && children(el.getBoundingClientRect())}
    </SCardPlaceholder>
  ) : null;
}

/**
 * Card
 * ----------------------------------------------------------------
 */
function Card(props: ICardProps): JSX.Element {
  const { children, ...rest } = props;
  const [{ theme }] = useCharts();
  const value = useMemo(() => ({ ...rest }), [props.children, props.isLoading]);
  const cardStyle = {
    "--bg-color": theme.card.backgroundColor,
  } as React.CSSProperties;
  return (
    <CardContext.Provider value={value}>
      <SCard style={cardStyle}>{children}</SCard>
    </CardContext.Provider>
  );
}

Card.defaultProps = {
  children: () => null,
  isLoading: true,
};

Card.Header = Header;
Card.Content = forwardRef(Content);
Card.Placeholder = Placeholder;

export default Card;
