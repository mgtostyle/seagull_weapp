export interface PageProps {
  initialValue?;
  placeholder: string;
  icon: string;
  modal: Modal;
  request?: (() => Promise<{[propsName: string]: any}>);
  setFieldValue?: (value: { value: string | number }) => void;
}

export interface PageState {
  visible: boolean;
  modal: Modal;
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