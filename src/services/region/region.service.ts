import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async getRegions() {
    return this.prisma.region.findMany();
  }
}
