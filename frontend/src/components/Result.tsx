import React from 'react';
import { Grid, InputAdornment, List, MenuItem, Paper, TextField, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import TrainIcon from '@material-ui/icons/Train';
import CarIcon from '@material-ui/icons/DirectionsCar';
import PlaneIcon from '@material-ui/icons/Flight';
import MarkerIcon from '@material-ui/icons/Room';
import './Result.css'
import { useData } from '../DataProvider';

interface SelectProps {
  label: string
  disabledItems: (string | null)[]
  options: { code: string, name: string }[]
  value: string | null
  onChange: (code: string) => void
  Icon: any
}

const Icons = {
  train: <TrainIcon />,
  car: <CarIcon />,
  plane: <PlaneIcon />
}

const Text = {
  train: 'Zug (Fernverkehr)',
  car: 'Auto',
  plane: 'Flugzeug'
}

const numberFormat = new Intl.NumberFormat('de-DE', { style: 'unit', unit: 'kilogram', maximumFractionDigits: 0 })

const Select = ({ label, options, value, onChange, disabledItems, Icon }: SelectProps) => {
  return (
    <TextField
      select
      label={label}
      fullWidth
      value={value}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {Icon}
          </InputAdornment>
        ),
      }}
    >
      {options.map(option => (
        <MenuItem key={option.code} value={option.code} disabled={disabledItems.includes(option.code)}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  )
}

const Result = () => {
  const { airports, footprints, origin, setOrigin, destination, setDestination } = useData()
  return (
    <Paper className="ResultPaper" elevation={3}>
      <Typography variant="h4">
          Reise
      </Typography>
      <Grid className="ResultContainer" container spacing={8} direction="column">
        <Grid item>
          <Select label="Start" options={airports} value={origin} onChange={setOrigin} disabledItems={[destination]} Icon={<MarkerIcon color="primary"/>}/>
        </Grid>
        <Grid item>
          <Select label="Ziel" options={airports} value={destination} onChange={setDestination} disabledItems={[origin]} Icon={<MarkerIcon color="secondary"/>}/>
        </Grid>
        <Grid className="ResultListContainer" item>
          <List component="nav" className="ResultList">
            {footprints.map(footprint => (
              <ListItem key={footprint.transport}>
                <ListItemIcon>
                  {Icons[footprint.transport]}
                </ListItemIcon>
                <ListItemText secondary={Text[footprint.transport]} primary={numberFormat.format(footprint.footprint)} />
            </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}
 
export default Result;