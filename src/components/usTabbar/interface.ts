export interface PageProps {
  current: CurrentIndex;
  readonly list: [Tabbar, Tabbar, Tabbar?, Tabbar?, Tabbar?];
  onChange?: (value: CurrentIndex) => void;
}

export type CurrentIndex = 0 | 1 | 2 | 3 | 4;

export interface Tabbar {
  name: string;
  icon: string;
  path?: string;
  color?: string;
}
