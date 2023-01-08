export interface PageProps {
  icon: string;
  placeholder: string;
  initialValue;
  modal: Modal;
  setFieldValue?: (value: any) => void;
}

export interface PageState {
  initialValue: Array<string | number>;
  visible: boolean;
  current: number;
}

export interface Modal {
  title: string;
  range: Array<Range>;
}

export interface Range {
  label: string;
  value: string | number;
  children?: Array<Range>;
}
