export interface NavigateUpdateParams {
  type: 'CREATE' | 'MODIFY';
  level: 1 | 2 | 3;
  detail?;
}