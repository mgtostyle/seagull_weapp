export interface PageProps {
  back: 0 | 1 | 2;
  menu: MenuItem[];
  title: string;
}

export interface MenuItem {
  name: string;
  path: string;
}