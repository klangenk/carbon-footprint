import { BadRequestException, Injectable } from '@nestjs/common';
import { Footprints, Params, TransportType } from './interface.dto';
import * as airports from '../airports.json';
import { getDistance } from 'geolib';
import { sortBy, keyBy } from 'lodash';
import { GoClimateApiClient } from './go-climate.client';

const airportDictionary = keyBy(airports, 'code');

/**
 * C02 emission in kg per km
 * https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0
 */
const FOOTPRINT_CAR = 0.147;
const FOOTPRINT_TRAIN = 0.032;

@Injectable()
export class AppService {
  constructor(private goClimateApiClient: GoClimateApiClient) {}

  /**
   * Get distance in km between to airports
   */
  private getDistanceKm({ origin, destination }: Params) {
    return (
      getDistance(airportDictionary[origin], airportDictionary[destination]) /
      1000
    );
  }

  /**
   * Get carbon footprints of a trip from one airport to another
   */
  async getFootprints(params: Params): Promise<Footprints> {
    if (params.origin === params.destination) {
      throw new BadRequestException('Origin and destination must be different');
    }
    const distanceKm = this.getDistanceKm(params);
    const footprints = [
      {
        transport: TransportType.car,
        footprint: FOOTPRINT_CAR * distanceKm,
      },
      {
        transport: TransportType.train,
        footprint: FOOTPRINT_TRAIN * distanceKm,
      },
      {
        transport: TransportType.plane,
        footprint: await this.goClimateApiClient.getPlaneFootprint(params),
      },
    ];
    return {
      footprints: sortBy(footprints, 'footprint'),
    };
  }

  /**
   * Get supported airports
   */
  getAirports() {
    return { airports };
  }
}
