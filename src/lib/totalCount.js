/**
 * Returns the sum of the value of the property 'count' in the array
 * @param array The array to calculate the sum
 */
export default function totalCount(array = []) {
  return array.reduce((prev, curr) => prev + curr.count, 0);
};
