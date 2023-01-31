import { Controller, Get } from '@nestjs/common';
import { Amenity } from '@prisma/client';

import { AmenityService } from '~/src/services/amenity/amenity.service';

@Controller('amenity')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Get()
  getAmenities(): Promise<Amenity[]> {
    return this.amenityService.getAmenities();
  }
}
