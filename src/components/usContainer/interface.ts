export interface PageProps {
  back: 0 | 1 | 2;
  icon?: string;
  isHead: boolean;
  menus: Array<MenuItem>;
  title: string;
  isfull: boolean;
  bcolor: string;
  tcolor?: string;
  tabbar: boolean;
}

export interface MenuItem {
  name: string;
  result: () => void;
}

export interface PageState {
  visible: boolean;
}
