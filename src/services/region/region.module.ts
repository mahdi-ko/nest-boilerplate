import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/prisma.module';
import { RegionService } from './region.service';

@Module({
  imports: [PrismaModule],
  providers: [RegionService],
  exports: [RegionService],
})
export class RegionModule {}
