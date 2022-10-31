export interface EnvironmentParams {
  DOMAIN_NAME: string;
}

export interface HttpsDefaultProps {
  method: Method;
  timeout: number;
}

export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';

export type RequestHandler<T> = [T, DataType];

export type DataType = 'Object' | 'Suffix';
