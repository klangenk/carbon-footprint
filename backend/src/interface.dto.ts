import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import * as airports from '../airports.json';

const airportCodes = airports.map((airport) => airport.code);

export enum TransportType {
  car = 'car',
  train = 'train',
  plane = 'plane',
}

export class Footprint {
  transport: TransportType;
  footprint: number;
}

export class Footprints {
  footprints: Footprint[];
}

export class Airport {
  code: string;
  name: string;
  latitude: number;
  longitude: number;
}

export class Airports {
  airports: Airport[];
}

export class Params {
  /**
   * IATA-Code of origin
   */
  @IsIn(airportCodes)
  @ApiProperty({ enum: airportCodes })
  origin: string;

  /**
   * IATA-Code of destination
   */
  @IsIn(airportCodes)
  @ApiProperty({ enum: airportCodes })
  destination: string;
}
