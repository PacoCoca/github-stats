/**
 * Returns the maximum value of the property 'count' in the array
 * @param array The array to calculate the maximum
 */
export default function maxCount(array = []) {
  const max = array.reduce((prev, curr) => {
    return (prev.count > curr.count) ? prev : curr;
  });
  return max;
};
