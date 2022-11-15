import type { PageProps as ButtonConfig } from '../usButton/interface'

export interface PageProps {
  backgroundColor: string;
  is: boolean;
  icon?: string;
  buttonText: string;
  buttonConfig?: ButtonConfig;
}