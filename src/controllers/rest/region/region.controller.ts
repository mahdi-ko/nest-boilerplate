import { Controller, Get } from '@nestjs/common';
import { Region } from '@prisma/client';

import { RegionService } from '~/src/services/region/region.service';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  getRegions(): Promise<Region[]> {
    return this.regionService.getRegions();
  }
}
