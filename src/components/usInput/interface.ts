import type { InputProps } from '@tarojs/components'

export interface PageProps extends InputProps {
  initialValue: string;
  setFieldValue?: (params: {value: string | number, update: boolean}) => void;
}