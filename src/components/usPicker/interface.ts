export interface PageProps {
  icon: string;
  placeholder: string;
  initialValue: string;
  modal: Modal;
}

export interface PageState {
  initialValue: Array<string | number>;
  visible: boolean;
  current: number;
  onChange?: (value: Array<string | number>) => void;
}

export interface Modal {
  title: string;
  range: Array<Range>;
  rangeKey?: string;
}

export interface Range {
  label: string;
  value: string | number;
  children?: Array<Range>;
}