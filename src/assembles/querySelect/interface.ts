export interface PageProps {
  ref?;
  position?: 'relative' | 'fixed' | 'absolute' | 'sticky';
  placeholder?: string;
  search?: boolean;
  onSubmit?: <T>(values: T) => void;
  select?: boolean;
  columns?: QuerySelectColumns;
}

export interface ColumnItem {
  title: string;
  dataIndex: string;
  typeof?: 'string' | 'number';
  request?: () => Promise<Array<OptionItem>>;
  valueEnum?: {[propsName: string]: any};
}

export interface OptionItem {
  label: string;
  value: string | number;
}

export type QuerySelectColumns = Array<ColumnItem>
