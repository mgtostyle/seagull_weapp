export interface CheckProps {
  className: string;
  value: number | string;
  color: string;
  checked: boolean;
  disabled: boolean;
  direction: 'left' | 'right';
  onChange?: (value: number | string, status: boolean) => void;
}

export interface CheckGroupProps {

}
