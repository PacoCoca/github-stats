import React, { useState } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import SearchBar from '../searchBar/searchBar.js';
import { useTheme } from '@material-ui/core/styles';
import images from '../../images/index.js';
import styles from './myAppBar.module.css';

function MyAppBar(props) {
  const { onSearch } = props;

  const theme = useTheme();
  const [searchText, setSearchText] = useState('');

  function handleChangeText(event) {
    setSearchText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchText);
  }

  return (
    <AppBar position='fixed' style={{ backgroundColor: theme.palette.background.default }} >
      <Toolbar >
        <form onSubmit={handleSubmit} className='fullWidth'>
          <SearchBar value={searchText} onChange={handleChangeText} />
        </form>
        <img src={images.logo} className={styles.logo}/>
      </Toolbar>
    </AppBar >
  );
}

export default MyAppBar;
