export interface PageProps {
  textValue: string;
  textColor: string;
  textSize: number;
  boxSize: number;
  percent: number;
  lineWidth: number;
  lineColor: string;
  lineBack: string;
}

export interface PageState {
  percent: number;
  lineColor: string;
}
