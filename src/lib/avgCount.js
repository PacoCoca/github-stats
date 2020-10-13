import totalCount from "./totalCount";

/**
 * Returns the average value of the property 'count' in the array
 * @param array The array to calculate the average
 */
export default function avgCount(array = []) {
  const total = totalCount(array);
  return Math.round(total * 100 / array.length) / 100;
};
