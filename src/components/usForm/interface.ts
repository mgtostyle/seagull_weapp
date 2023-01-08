import type { FormProps } from '@tarojs/components'
import type { PageProps as FormButtonProps } from '@components/usButton/interface'

export interface FieldValue {
  name: string;
  value: any;
  update?: boolean;
}

export interface PageProps extends FormProps {
  formRef?;
  initialValues: {[propsName: string]: any};
  request: (() => Promise<{[propsName: string]: any}>);
  buttonConfig?: ButtonConfig;
  setFieldValue?: (fieldValue: FieldValue) => void;
  onReset?: () => void;
}

export interface PageState {
  visible: boolean;
  initialValues: {[propsName: string]: any};
  shouldComponentUpdate: boolean;
}

export interface PageItemProps {
  nodeKey?: 'ItemGroup';
  label: string;
  name: string;
  direction: 'horizontal' | 'vertical';
  initialValues?;
  setFieldValue?: (fieldValue: FieldValue) => void;
}

export interface PageFieldState {
  value: string;
}

export interface ButtonConfig {
  resetText?: string;
  submitText?: string;
  resetButtonProps?: FormButtonProps;
  submitButtonProps?: FormButtonProps;
}

export interface PageItemGroupProps {
  label: string;
  initialValues?;
  setFieldValue?: (fieldValue: FieldValue) => void;
}

export interface PageConsumerProps {
  label: string;
  initialValues?;
  shouldComponentUpdate?: boolean;
  setFieldValue?: (FieldValue: FieldValue) => void;
  children?;
}

export interface PageConsumerState {
  updateVisible: boolean;
}