export type TabbarIndex = 0 | 1 | 2 | 3 | 4

export interface UserColumnItem {
    icon: string;
    name: string;
    value?: string;
    status: boolean;
    result?: () => void;
  }