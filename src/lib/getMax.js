export default function getMax(contributions) {
  let maxDay = contributions[0];
  let maxMonth = { count: 0 };
  let maxYear = { count: 0 };
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

    if (contribution.count > maxDay.count) {
      maxDay = contribution;
    }

    if (`${year}-${month}` === currentMonth.date) {
      currentMonth.count += contribution.count;
    } else {
      if (currentMonth.count > maxMonth.count) {
        maxMonth = currentMonth;
      }
      currentMonth = {
        date: `${year}-${month}`,
        count: 0
      };
    }

    if (year === currentYear.date) {
      currentYear.count += contribution.count;
    } else {
      if (currentYear.count > maxYear.count) {
        maxYear = currentYear;
      }
      currentYear = {
        date: year,
        count: 0
      };
    }
  }

  return {
    maxDay: maxDay,
    maxMonth: maxMonth,
    maxYear: maxYear
  };
};
