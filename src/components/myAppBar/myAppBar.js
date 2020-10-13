import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SearchBar from '../searchBar/searchBar.js';
import { useTheme } from '@material-ui/core/styles';
import images from '../../images/index.js';
import styles from './myAppBar.module.css';
import { Brightness7, Brightness4 } from '@material-ui/icons';

function MyAppBar(props) {
  const { onSearch, toggleTheme } = props;

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
    <AppBar
      position='fixed'
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Toolbar className={styles.container}>
        <Typography variant='h4' >
          GitHub Stats
        </Typography>
        <div className={styles.rightSide}>
          {
            onSearch &&
            <form onSubmit={handleSubmit}>
              <SearchBar value={searchText} onChange={handleChangeText} />
            </form>
          }
          <IconButton
            className={styles.toggleTheme}
            color='primary'
            aria-label='Toggle light/dark theme'
            onClick={toggleTheme}
          >
            {
              theme.palette.type === 'light' ?
                <Brightness4 /> :
                <Brightness7 />
            }
          </IconButton>
          <img src={images.logo} className={styles.logo} alt='logo' />
        </div>
      </Toolbar>
    </AppBar >
  );
}

export default MyAppBar;
