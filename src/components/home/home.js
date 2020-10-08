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
    const response = await lib.getUserData(searchText);
    if (response.errors) {
      // TODO: show some error msg
      console.error('not found');
    } else {
      // TODO: store the response with redux
      console.log(response);
      history.push('/stats');
    }
  }

  function handleChangeText(event) {
    setSearchText(event.target.value);
  }

  function handleSubmit(event) {
    search();
    event.preventDefault();
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
