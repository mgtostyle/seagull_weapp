import type { FormProps } from '@tarojs/components'

export interface PageProps extends FormProps {

}

export interface PageItemProps {
  nodeKey?: 'ItemGroup';
  label: string;
  name: string;
  direction: 'horizontal' | 'vertical';
}

export interface PageFieldState {
  value: string;
}
