import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const urlParams = new URLSearchParams(window.location.search);

const jwt = urlParams.get('jwt')

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { Authorization: `Bearer ${jwt}` }
})

interface Airport {
  code: string
  name: string
  latitude: string
  longitude: string
}

interface Data {
  authorized: boolean;
  airports: Airport[];
  footprints: Footprint[];
  setOrigin: (code: string) => void;
  setDestination: (code: string) => void;
  destination: string;
  origin: string;
}

enum TransportType {
  car = 'car',
  train = 'train',
  plane = 'plane',
}

interface Footprint {
  transport: TransportType;
  footprint: number;
}

const DataContext = createContext<Data|null>(null)

interface Props {
  children: any
}

export const DataProvider = ({ children }: Props) => {
  const [origin, setOrigin] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [airports, setAirports] = useState<Airport[]>([])
  const [footprints, setFootprints] = useState<Footprint[]>([])
  const [authorized, setAuthorized] = useState<boolean>(!!jwt)
  useEffect(() => {
    api.get('airports')
      .then(response => setAirports(response.data.airports))
      .catch(err => setAuthorized(false))
  }, [])
  useEffect(() => {
    if (!origin || !destination) {
      setFootprints([])
      return
    }
    api.get('footprints', { params: { origin, destination } })
      .then(response => setFootprints(response.data.footprints))
      .catch(err => setAuthorized(false))
  }, [origin, destination])
  return (
    <DataContext.Provider value={{
      authorized,
      airports,
      footprints,
      setOrigin,
      setDestination,
      destination,
      origin
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)!