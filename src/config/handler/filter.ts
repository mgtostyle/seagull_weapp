export const swapItems = (array: Array<any>, beforeIndex: number, afterIndex: number) => {
  array[beforeIndex] = array.splice(afterIndex, 1, array[beforeIndex])[0]
  return array;
}