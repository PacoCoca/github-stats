import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/home/home.js';
import Stats from './components/stats/stats.js';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#8ab0ab',
    },
    secondary: {
      main: '#26413C',
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path='/stats'>
            <Stats />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
