import React from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerIcon from '@material-ui/icons/Room';
import './Map.css'
import { Paper } from '@material-ui/core';
import { useData } from '../DataProvider';

interface MarkerProps {
  status: 'origin' | 'destination' | null
  lat: number,
  lng: number
}

const Marker = ({ status }: MarkerProps) => {
  let color: "action" | "primary" | "secondary" = 'action'
  if (status === 'origin') color = 'primary'
  else if (status === 'destination') color = 'secondary'
  return (
    <div className="Marker">
      <MarkerIcon fontSize={status === null ? 'default' : 'large'} color={color}/>
    </div>
  )
}
 
interface Props {
  center: {
    lat: number,
    lng: number
  },
  zoom: number
}

const Map = (props: Props) => {
  const {airports, origin, destination} = useData()
  return (
    <Paper className="MapContainer" elevation={3}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY! }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
      > 
        {airports.map(airport => (
          <Marker
            key={airport.code}
            status={airport.code === origin ? 'origin' : (airport.code === destination ? 'destination' : null)}
            lat={parseFloat(airport.latitude)}
            lng={parseFloat(airport.longitude)}
          />
        ))}
      </GoogleMapReact>
    </Paper>
  );
}
 
export default Map;