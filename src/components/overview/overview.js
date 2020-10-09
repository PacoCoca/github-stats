import React from 'react';
import lib from '../../lib';
import { Typography } from '@material-ui/core';

function Overview(props) {
  const { contributions } = props;

  const { maxYear, maxMonth, maxDay } = lib.getMax(contributions);
  const longestStreak = lib.getLongestStreak(contributions);

  return (
    <>
      <Typography variant='h3'>
        Overview
      </Typography>
      <Typography>
        Day with most contributions {maxDay.date}, with {maxDay.count} contributions
      </Typography>
      <Typography>
        Month wiht most contributions {maxMonth.date}, with {maxMonth.count} contributions
      </Typography>
      <Typography>
        Year with most contributions {maxYear.date}, with {maxYear.count} contributions
      </Typography>
      <Typography>
        Longest contribution streak from {longestStreak.start} to {longestStreak.end},
        with {longestStreak.days} days in a row!
      </Typography>
    </>
  );
}

export default Overview;
