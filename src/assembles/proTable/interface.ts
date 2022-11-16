import type { PageProps as DataNoneConfig } from '@components/usDataNone/interface'

export interface ProTableProps {
  className?: string;
  limit?: number;
  initialValues?: {[propsName: string]: any};
  refresh?: boolean;
  hitbottom?: boolean;
  request: <T>(values?) => Promise<ResponseProps<T>>;
  children?;
  noneConfig?: DataNoneConfig;
}

export interface ResponseProps<T> {
  list: Array<T>;
  count: number;
}