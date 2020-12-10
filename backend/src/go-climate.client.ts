import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Params } from './interface.dto';

const API_URL = 'https://api.goclimate.com/v1/flight_footprint';

@Injectable()
export class GoClimateApiClient {
  private apiKey: string;

  constructor(configService: ConfigService) {
    this.apiKey = configService.get<string>('GO_CLIMATE_API_KEY');
    if (!this.apiKey) {
      throw new Error('GO_CLIMATE_API_KEY is not set');
    }
  }

  /**
   * Get carbon footprint for travel by plane
   */
  async getPlaneFootprint({ origin, destination }: Params) {
    const response = await axios.get(API_URL, {
      auth: { username: this.apiKey, password: '' },
      params: {
        'segments[0][origin]': origin,
        'segments[0][destination]': destination,
        cabin_class: 'economy',
      },
    });
    return response.data.footprint;
  }
}
