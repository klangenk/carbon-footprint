import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

interface Airport {
  code: string
  name: string
  latitude: string
  longitude: string
}

interface Data {
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
  useEffect(() => {
    axios.get('http://localhost:3001/airports').then(response => setAirports(response.data.airports))
  }, [])
  useEffect(() => {
    if (!origin || !destination) {
      setFootprints([])
      return
    }
    axios.get('http://localhost:3001/footprints', { params: { origin, destination } }).then(response => setFootprints(response.data.footprints))
  }, [origin, destination])
  return (
    <DataContext.Provider value={{
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