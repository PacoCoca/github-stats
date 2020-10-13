/**
 * Given an array of contributions,
 * returns an object adding the count property per day, month and year
 * @param contributions An array with form `[{date, count, ...}, ...]` 
 */
export default function groupDMY(contributions = []) {
  if (contributions.length === 0) {
    return {
      perDay: [],
      perMonth: [],
      perYear: []
    };
  }
  const perMonth = [], perYear = [];
  let currentMonth, currentYear;
  const [year, month,] = contributions[0].date.split('-');
  currentMonth = {
    date: `${year}-${month}`,
    count: 0
  }
  currentYear = {
    date: year,
    count: 0
  }

  for (const contribution of contributions) {
    const [year, month,] = contribution.date.split('-');

    if (`${year}-${month}` === currentMonth.date) {
      currentMonth.count += contribution.count;
    } else {
      perMonth.push(currentMonth);
      currentMonth = {
        date: `${year}-${month}`,
        count: 0
      };
    }

    if (year === currentYear.date) {
      currentYear.count += contribution.count;
    } else {
      perYear.push(currentYear);
      currentYear = {
        date: year,
        count: 0
      };
    }
  }
  perMonth.push(currentMonth);
  perYear.push(currentYear);

  return {
    perDay: contributions,
    perMonth: perMonth,
    perYear: perYear
  };
};
