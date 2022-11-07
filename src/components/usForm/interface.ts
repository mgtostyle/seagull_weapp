import type { FormProps } from '@tarojs/components'

export interface FieldValue {
  name: string;
  value: any;
}

export interface PageProps extends FormProps {
  initialValues: {[propsName: string]: any};
  request?: boolean | (() => {[propsName: string]: any});
  setFieldValue?: (fieldValue: FieldValue) => void;
  onSubmit?: (values: any) => void;
}

export interface PageState {
  initialValues: {[propsName: string]: any};
}

export interface PageItemProps {
  nodeKey?: 'ItemGroup';
  label: string;
  name: string;
  direction: 'horizontal' | 'vertical';
  initialValue?: string;
  setFieldValue?: (fieldValue: FieldValue) => void;
}

export interface PageFieldState {
  value: string;
}
