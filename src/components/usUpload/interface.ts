export interface PageProps {
  className?: string;
  mode: string;
  initialValue: Array<ImageItem>;
  limit: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  setFieldValue?: (e: {value: Array<ImageItem>}) => void;
}

export interface ImageItem {
  uid?: number;
  url: string;
  status: 'done' | 'error' | 'loading';
  percent?: number;
}
