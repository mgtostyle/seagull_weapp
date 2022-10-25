import type { ButtonProps } from '@tarojs/components'

export interface PageProps extends ButtonProps {
  nodeKey?: 'ButtonGroup';
  block: boolean;
  theme?: 'default' | 'primary' | 'danger';
  ghost: boolean;
  width: string | number;
}