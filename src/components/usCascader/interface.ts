export interface PageProps {
  initialValue?;
  placeholder: string;
  icon: string;
  modal: Modal;
  setFieldValue?: (value: { value: string | number }) => void;
}

export interface PageState {
  visible: boolean;
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