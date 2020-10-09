import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';
import styles from './stats.module.css';
import lib from '../../lib';
import { useWindowDimensions } from '../../hooks';

function Stats(props) {
  const history = useHistory();
  const { width, height } = useWindowDimensions();
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxDay, setMaxDay] = useState();
  const [maxMonth, setMaxMonth] = useState();
  const [maxYear, setMaxYear] = useState();
  const [longestStreak, setLongestStrek] = useState();

  let user;
  if (history.location.state) {
    user = history.location.state.user;
  } else {
    history.push('/');
  }

  useEffect(() => {
    async function fetchContributions() {
      const contributions = await lib.getContributions({
        username: user.login,
        creationYear: parseInt(user.createdAt.split('-', 1)[0]),
      });
      setContributions(contributions);
    }
    if (user) {
      fetchContributions();
    }
  }, [user]);

  // I could do the math directly in the render, 
  // but this way I can do it more efficiently
  useEffect(() => {
    if (contributions.length > 0) {
      const { maxYear: my, maxMonth: mm, maxDay: md } = lib.getMax(contributions);
      setMaxYear(my);
      setMaxMonth(mm);
      setMaxDay(md);
      setLongestStrek(lib.getLongestStreak(contributions));
      setLoading(false);
    }
  }, [contributions]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress size={(width > height) ? '33vh' : '33vw'} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Typography variant='h3'>
        Summary
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
    </div>
  );
}

export default Stats;
