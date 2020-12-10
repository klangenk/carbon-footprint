import React from 'react';
import 'fontsource-roboto';
import './App.css';
import { DataProvider } from './DataProvider';
import Content from './components/Content'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#036bfc',
      main: '#036bfc',
      dark: '#036bfc',
    },
    secondary: {
      light: '#03befc',
      main: '#03befc',
      dark: '#03befc',
    }
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '3rem'
      },
      h2: {
        fontSize: '2rem'
      }
    }
  },
});

function App() {
  return (
    <div className="App">
      <DataProvider><ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
      </DataProvider>
      <a className="ApiLink" href="https://api.goclimateneutral.org/docs">https://api.goclimateneutral.org/docs</a>
    </div>
  );
}

export default App;
