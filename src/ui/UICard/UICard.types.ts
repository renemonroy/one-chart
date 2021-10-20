export interface IUICardContext {
  isLoading: boolean;
}

export interface IUICardProps extends React.HTMLAttributes<HTMLElement> {
  children?: JSX.Element | JSX.Element[];
  isLoading: boolean;
}

export interface IUICardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
}

export interface IUICardContentProps extends React.HTMLAttributes<HTMLElement> {
  children?: JSX.Element | JSX.Element[];
  innerRef?: (node: HTMLDivElement) => void;
}

export interface IUICardPlaceholderProps
  extends React.HTMLAttributes<HTMLElement> {
  children: (dimensions: DOMRect) => JSX.Element | JSX.Element[];
}
