export interface PageProps {
  back: 0 | 1 | 2;
  menu: MenuItem[];
  title: string;
  isfull: boolean;
  bcolor: string;
  tcolor?: string;
}

export interface MenuItem {
  name: string;
  path: string;
}