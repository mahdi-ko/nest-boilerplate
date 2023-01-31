import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prisma.service';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async getCountries() {
    return this.prisma.country.findMany({ orderBy: { name: 'asc' } });
  }
}
