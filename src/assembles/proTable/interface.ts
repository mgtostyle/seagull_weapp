export interface ProTableProps {
  className: string;
  initialValues?: {[propsName: string]: any};
  refresh?: boolean;
  hitbottom?: boolean;
  // request: (values?) => Promise<Array<any>>;
  request: any;
  children?;
}
