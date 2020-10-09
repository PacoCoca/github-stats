import totalCount from "./totalCount";

export default function avgCount(array = []) {
  const total = totalCount(array);
  return total / array.length;
};
