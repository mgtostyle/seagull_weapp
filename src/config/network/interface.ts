export interface EnvironmentParams {
  [propsName: string]: any;
}

export interface RequestProps {
  joggle: string;
}

export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH'

export type RequestHandler<T> = [
  T,
  FormDataType
]

export type FormDataType = 'Object' | 'String'