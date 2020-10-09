export default function getMaxCount(array = []) {
  const max = array.reduce((prev, curr) => {
    return (prev.count > curr.count) ? prev : curr;
  });
  return max;
};
