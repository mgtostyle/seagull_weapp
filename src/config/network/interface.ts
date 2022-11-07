export interface EnvironmentParams {
  DOMAIN_NAME: string;
}

export interface ClientInfo {
  'serve-type': 'WXMINI'
}

export interface HttpsDefaultProps {
  method: Method;
  timeout: number;
  clientInfo: ClientInfo;
}

export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';

export type RequestHandler<T> = [T, DataType];

export type DataType = 'Object' | 'Suffix';

export interface Response {
  code: 200 | 101 | 102 | 403 | 500;
  data: any;
  message: string;
}

export interface UploadFileParams {
  file: string;
  name: 'singleImage';
  task?: () => void;
}

export interface OperateParams {
  toast?: boolean;
}