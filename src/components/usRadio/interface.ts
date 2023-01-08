import type { RadioGroupProps } from '@tarojs/components'

export interface PageProps {
  initialValue: string | number;
  value: string | number;
  setFieldValue?: (value: string | number) => void;
}

export interface PageGroupProps extends RadioGroupProps {
  nodeKey: string;
  initialValue: string | number;
  setFieldValue?: (value: any) => void;
}
