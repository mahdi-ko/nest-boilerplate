import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/prisma.module';
import { CompanyAdsService } from './companyAds.service';

@Module({
  imports: [PrismaModule],
  providers: [CompanyAdsService],
  exports: [CompanyAdsService],
})
export class CompanyAdsModule {}
