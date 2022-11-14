export interface EnvironmentProps {
  env: () => DomainValues;
}

export interface DomainValues {
  DOMAIN_NAME: string;
}

export interface HttpsProps {
  useRefuse: boolean;
  taskCb: boolean | (<Task>(values?: Task) => void);
}

export interface RequestDefaultParams {
  method: Method;
  timeout: number;
  clientInfo: ClientInfo;
}

export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';

export interface ClientInfo {
  'serve-type': 'WXMINI';
}

export interface UploadFileParams {
  url: string;
  filePath: string;
  name: string;
  header?: {[propsName: string]: any};
  formData?: {[propsName: string]: any};
  timeout?: number;
  fileName?: string;
  complete?: (values?) => void;
  fail?: (err?) => void;
  success?: (res?) => void;
}

export interface UploadFileOptions {
  source: 'singleImage';
  name: string;
  task?: boolean | (<Task>(value?: Task) => void);
}

export interface ResponseParams {
  code: 200 | 101 | 102 | 403 | 500;
  data?;
  message: string;
}

export type FormDataType = 'Object' | 'Suffix';

export interface OperateDefaultParams {
  toast: boolean;
  callback?(values?);
  taskCb?: boolean | (<Task>(value?: Task) => void);
}

export interface RefuseItem {
  source: string | number | boolean;
  target: string | number | boolean;
  result: (values?) => Promise<any>;
}