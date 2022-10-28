import type { ButtonProps } from '@tarojs/components'

export interface PageProps extends ButtonProps {
  nodeKey?: 'Group';
  block: boolean;
  theme: 'default' | 'primary' | 'danger';
  ghost: boolean;
  width: string | number;
}

export interface PageGroupProps {
  block: boolean;
  size: 'default' | 'mini';
  theme: 'default' | 'primary' | 'danger';
}