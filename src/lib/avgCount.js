import totalCount from "./totalCount";

export default function avgCount(array = []) {
  const total = totalCount(array);
  return Math.round(total * 100 / array.length) / 100;
};
