import { Controller, Get } from '@nestjs/common';
import { Country } from '@prisma/client';

import { CountryService } from '~/src/services/country/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getCountries(): Promise<Country[]> {
    return this.countryService.getCountries();
  }
}
