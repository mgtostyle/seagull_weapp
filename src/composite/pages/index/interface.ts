export type TabbarIndex = 0 | 1 | 2 | 3 | 4;

export interface MiniAppItem {
  id: string;
  title: string;
  logo: string;
  path: string;
  status: number;
}

export interface SettingItem {
  icon: string;
  name: string;
  value: string;
  result?: () => void;
}