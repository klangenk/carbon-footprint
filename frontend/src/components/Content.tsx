import React from 'react';
import './Content.css';
import Map from './Map';
import Result from './Result';
import Login from './Login';
import { Grid, Typography } from '@material-ui/core';
import { useData } from '../DataProvider';

function Content() {
  const { authorized } = useData();

  return (
    <>
      <Login show={!authorized} />
      <Typography variant="h1">
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
    </>
  );
}

export default Content;
