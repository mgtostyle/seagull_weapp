import { ImageProps } from '@tarojs/components'

export interface PageProps extends ImageProps {
  className?: string;
  shape: 'circle' | 'square';
  onError?: () => void;
  onChange?: (e?) => void;
}

export interface PageState {
  visible: boolean;
}
