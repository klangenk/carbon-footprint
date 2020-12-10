import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Airports, Params } from './interface.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Get carbon footprints of a trip from one airport to another
   */
  @Get('footprints')
  @UseGuards(AuthGuard('jwt'))
  getFootprints(@Query() query: Params) {
    return this.appService.getFootprints(query);
  }

  /**
   * Get supported airports
   */
  @Get('airports')
  @UseGuards(AuthGuard('jwt'))
  getAirports(): Airports {
    return this.appService.getAirports();
  }
}
