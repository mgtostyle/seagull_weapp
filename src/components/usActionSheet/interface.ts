export interface PageProps {
  childRef?;
}

export interface PageState {
  visible: boolean;
  zIndex?: number;
  tabbar?: boolean;
  request?: () => Promise<Array<ColumnItem>>;
  columns?: Array<ColumnItem>;
}

export interface ColumnItem {
  name: string;
  color?: string;
  disable?: boolean;
  result?: (values?) => void;
}