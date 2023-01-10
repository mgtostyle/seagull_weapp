export const priceTypeLabel = (type: 1 | 2) => {
  switch (type) {
    case 1:
      return '销售价/市场价';
    case 2:
      return '区间价';
    default:
      return false;
  }
}