import type { RadioGroupProps } from '@tarojs/components'

export interface PageProps {
  initialValue: string | number;
  value: string | number;
  onChange?: (value: string | number) => void;
}

export interface PageGroupProps extends RadioGroupProps {
  nodeKey: string;
  initialValue: string | number;
  onChange?: (value: any) => void;
}
