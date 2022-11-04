export interface PageProps {
  initialValue: Array<ImageItem>;
  limit: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  onChange?: (e: {value: Array<ImageItem>}) => void;
}

export interface ImageItem {
  uid?: number;
  url: string;
  status?: 'done' | 'error' | 'loading',
  percent?: number;
}
