export interface PageProps {
  placeholder?: string;
  search?: boolean;
  onSubmit?: (values: {[propsName: string]: any}) => void;
  select?: boolean;
  valueEnum?: Array<EnumItem>;
}

export interface EnumItem {
  title: string;
  dataIndex: string;
  request: () => Promise<Array<ValueItem>>;
}

export interface ValueItem {
  label: string;
  value: string | number;
}
