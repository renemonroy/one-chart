export interface ICardContext {
  isLoading: boolean;
}

export interface ICardProps extends React.HTMLAttributes<HTMLElement> {
  children?: JSX.Element | JSX.Element[];
  isLoading: boolean;
}

export interface ICardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
}

export interface ICardContentProps extends React.HTMLAttributes<HTMLElement> {
  children?: JSX.Element | JSX.Element[];
  innerRef?: (node: HTMLDivElement) => void;
}

export interface ICardPlaceholderProps
  extends React.HTMLAttributes<HTMLElement> {
  children: (dimensions: DOMRect) => JSX.Element | JSX.Element[];
}
