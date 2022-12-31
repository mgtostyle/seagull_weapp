import type { InputProps } from '@tarojs/components'

export interface PageProps extends InputProps {
  initialValue: string;
  onChange?: (value: {value: string | number}) => void;
}