export interface CategoryUpdateParams {
  type: 'CREATE' | 'MODIFY';
  level: 1 | 2;
  detail?;
}