export interface PageProps {
  back: 0 | 1 | 2;
  setting?: boolean;
  menus?: Array<MenuItem>;
  title: string;
  isfull: boolean;
  bcolor: string;
  tcolor?: string;
  tabbar?: boolean;
}

export interface MenuItem {
  name: string;
  result?: () => void;
}

export interface PageState {
  isHead: boolean;
  visible: boolean;
}
