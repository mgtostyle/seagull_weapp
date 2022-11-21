export interface PageProps {
  current: CurrentIndex;
  readonly list: Array<TabbarItem>;
  onChange?: (value: CurrentIndex) => void;
}

export type CurrentIndex = 0 | 1 | 2 | 3 | 4;

export interface TabbarItem {
  name: string;
  icon: string;
  path?: string;
  color?: string;
}
