import type { ButtonProps } from '@tarojs/components'

export interface PageProps extends ButtonProps {
  nodeKey?: 'Group';
  block: boolean;
  theme: 'default' | 'primary' | 'authorize' | 'danger' | 'forbid' | 'warn';
  ghost: boolean;
  width: string | number;
}

export interface PageGroupProps {
  block: boolean;
  size: 'default' | 'mini';
  theme: 'default' | 'primary' | 'authorize' | 'danger' | 'forbid' | 'warn';
}