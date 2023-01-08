export interface PageProps {
  className: string;
  value: number | string;
  color: string;
  checked: boolean;
  disabled: boolean;
  direction: 'left' | 'right';
  setFieldValue?: (value: number | string, status: boolean) => void;
}

export interface PageGroupProps {

}
