import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/prisma.module';
import { RealEstateService } from './realEstate.service';

@Module({
  imports: [PrismaModule],
  providers: [RealEstateService],
  exports: [RealEstateService],
})
export class RealEstateModule {}
