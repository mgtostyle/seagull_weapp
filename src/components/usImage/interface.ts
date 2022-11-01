import { ImageProps } from '@tarojs/components'

export interface PageProps extends ImageProps {
  className?: string;
  shape: 'circle' | 'square';
}

export interface PageState {
  visible: boolean;
}
