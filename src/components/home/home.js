import React, { useState } from 'react';
import SearchBar from '../searchBar/searchBar.js';
import images from '../../images';
import styles from './home.module.css';
import { Button } from '@material-ui/core';
import lib from '../../lib';
import { useHistory } from 'react-router-dom';

function Home(props) {
  const history = useHistory();

  const [searchText, setSearchText] = useState('');

  async function search() {
    const user = await lib.getUserData(searchText);
    if (!user) {
      // TODO: show some error msg
      console.error('not found');
    } else {
      history.push('/stats', user);
    }
  }

  function handleChangeText(event) {
    setSearchText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  return (
    <div
      style={{ backgroundImage: `url(${images.backgroundHome})` }}
      className={styles.container}
    >
      <div className={styles.child}>
        <form onSubmit={handleSubmit}>
          <SearchBar value={searchText} onChange={handleChangeText} />
          <div className={styles.buttonContainer}>
            <Button
              variant='contained'
              color='secondary'
              onClick={search}
            >
              Search
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
