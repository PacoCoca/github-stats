export default function totalCount(array = []) {
  return array.reduce((prev, curr) => prev + curr.count, 0);
};
