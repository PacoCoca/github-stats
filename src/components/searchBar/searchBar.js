import React from 'react';
import styles from './searchBar.module.css';
import { TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';

function SearchBar(props) {
  return <div className={styles.bar}>
    <TextField
      id="outlined-required"
      label="Search"
      variant="outlined"
      fullWidth={true}
    />
    <Search className={styles.icon} color="primary" />
  </div>;
}

export default SearchBar;