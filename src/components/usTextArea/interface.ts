import type { TextareaProps } from '@tarojs/components'

export interface PageProps extends TextareaProps {
  nodeKey?: 'Item';
  initialValue: string;
  setFieldValue?: (value: {value}) => void;
}