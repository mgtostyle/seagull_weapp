export interface PageProps {
  zIndex?: number;
  navigate?: boolean;
  tabbar?: boolean;
  request?: () => Promise<Array<ColumnItem>>;
  columns?: Array<ColumnItem>;
}

export interface ColumnItem {
  content: string;
  result?: (values?) => void;
}