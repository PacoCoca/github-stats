import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Divider, Toolbar } from '@material-ui/core';
import styles from './stats.module.css';
import lib from '../../lib';
import { useWindowDimensions } from '../../hooks';
import Overview from '../overview/overview.js';
import Profile from '../profile/profile.js';
import MyAppBar from '../myAppBar/myAppBar.js';

function Stats(props) {
  const history = useHistory();
  const { width, height } = useWindowDimensions();
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  let perYear = [], perMonth = [], perDay = [];
  if (contributions) {
    const grouped = lib.groupDMY(contributions);
    perYear = grouped.perYear;
    perMonth = grouped.perMonth;
    perDay = grouped.perDay;
  }

  useEffect(() => {
    if (history.location.state) {
      setUser(history.location.state.user);
    } else {
      history.push('/');
    }
  }, [history]);

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

  async function handleSearch(searchText) {
    const userData = await lib.getUserData(searchText);
    if (!userData) {
      // TODO: show some error msg
      console.error('not found');
    } else {
      setLoading(true);
      setUser(userData.user);
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress size={(width > height) ? '33vh' : '33vw'} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <MyAppBar onSearch={handleSearch} />
      <Toolbar />
      <Profile user={user} />
      <Divider className={styles.divider} />
      <Overview perYear={perYear} perMonth={perMonth} perDay={perDay} />
    </div>
  );
}

export default Stats;
