import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Airports, Params } from './interface.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Get carbon footprints of a trip from one airport to another
   */
  @Get('footprints')
  getFootprints(@Query() query: Params) {
    return this.appService.getFootprints(query);
  }

  /**
   * Get supported airports
   */
  @Get('airports')
  getAirports(): Airports {
    return this.appService.getAirports();
  }
}
