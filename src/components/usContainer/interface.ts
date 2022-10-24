export interface PageProps {
  global?: any;
  back: 0 | 1 | 2;
  menu: MenuItem[];
  title: string;
}

export interface MenuItem {
  name: string;
  path: string;
}