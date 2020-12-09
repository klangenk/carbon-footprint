import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Params } from './interface.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('footprints')
  getFootprints(@Query() query: Params) {
    return this.appService.getFootprints(query);
  }

  @Get('airports')
  getAirports() {
    return this.appService.getAirports();
  }
}
