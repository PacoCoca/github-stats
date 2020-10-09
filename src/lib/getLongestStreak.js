export default function getLongestStreak(contributions = []) {
  let longest = { days: 0 };
  let current = { start: contributions[0].date, days: 0 };

  for (let i = 0; i < contributions.length; i++) {
    if (contributions[i].count > 0) {
      current.days++;
    } else {
      if (current.days > longest.days) {
        longest = current;
        longest.end = contributions[i - 1].date;
      }
      if (i + 1 < contributions.length) {
        current = {
          start: contributions[i + 1].date,
          days: 0
        };
      }
    }
  }
  return longest;
};
