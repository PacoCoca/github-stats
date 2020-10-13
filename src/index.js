import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/home/home.js';
import Stats from './components/stats/stats.js';

function App(props) {
  const dark = {
    palette: {
      type: 'dark',
      primary: {
        main: '#8ab0ab',
        contrastText: '#fff'
      },
      secondary: {
        main: '#26413C',
      },
      backgroundOpacity: 'rgba(0,0,0,0.6)',
    },
  };
  const light = {
    palette: {
      type: 'light',
      primary: {
        main: '#315450',
        contrastText: '#000'
      },
      secondary: {
        main: '#001b16',
      },
      backgroundOpacity: 'rgba(255,255,255,0.6)',
    },
  };

  const [darkThemeSelected, setDarkThemeSelected] = useState(false);
  const theme = createMuiTheme(darkThemeSelected? light: dark);

  function toggleTheme() {
    setDarkThemeSelected(!darkThemeSelected);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path='/stats'>
            <Stats toggleTheme={toggleTheme} />
          </Route>
          <Route path='/'>
            <Home toggleTheme={toggleTheme} />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
