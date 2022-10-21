import type { ButtonProps } from '@tarojs/components'

export interface PageProps {
  block: boolean;
  size: 'small' | 'default' | 'large';
  theme?: 'default' | 'primary' | 'danger';
  ghost: boolean;
  field?: ButtonProps;
}
