import React from 'react';
import SearchBar from '../searchBar/searchBar.js';
import images from '../../images';
import styles from './home.module.css';
import { Button } from '@material-ui/core';

function Home(props) {
  return <div
    style={{ backgroundImage: `url(${images.backgroundHome})` }}
    className={styles.container}
  >
    <div className={styles.child}>
      <SearchBar />
      <div className={styles.buttonContainer}>
        <Button
          variant='contained'
          color='secondary'
        >
          Search
      </Button>
      </div>
    </div>
  </div>;
}

export default Home;