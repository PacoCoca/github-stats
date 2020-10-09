import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import styles from './stats.module.css';
import lib from '../../lib';
import { useWindowDimensions } from '../../hooks';
import Overview from '../overview/overview.js';

function Stats(props) {
  const history = useHistory();
  const { width, height } = useWindowDimensions();
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    if (user) {
      fetchContributions();
    }
  }, [user]);


  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress size={(width > height) ? '33vh' : '33vw'} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Overview contributions={contributions} />
    </div>
  );
}

export default Stats;
