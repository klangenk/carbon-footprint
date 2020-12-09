import React from 'react';
import './App.css';
import Map from './components/Map';
import Result from './components/Result';
import { Grid, Typography } from '@material-ui/core';
import { DataProvider } from './DataProvider';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Typography variant="h2">
          C0<sub>2</sub>-Bilanz-Vergleich
        </Typography>
        <Grid className="Container" container spacing={4} alignItems="stretch" justify="center" direction="row-reverse">
          <Grid container item xs={12} lg={6}>
            <Result />
          </Grid>
          <Grid container item xs={12} lg={6}>
            <Map
              center={{
                lat: 51.0516605909722,
                lng: 10.245379119371727
              }}
              zoom={6}
            />
          </Grid>
        </Grid>
      </DataProvider>
    </div>
  );
}

export default App;
