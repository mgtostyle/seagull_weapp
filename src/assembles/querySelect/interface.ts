export interface PageProps {
  placeholder?: string;
  search?: boolean;
  onSubmit?: (values: {[propsName: string]: any}) => void;
  select?: boolean;
  columns?: Array<ColumnItem>;
}

export interface ColumnItem {
  title: string;
  dataIndex: string;
  request?: () => Promise<Array<OptionItem>>;
  valueEnum?: Array<OptionItem>;
}

export interface OptionItem {
  label: string;
  value: string | number;
}

export type QuerySelectColumns = Array<ColumnItem>