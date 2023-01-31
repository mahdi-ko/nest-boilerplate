import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/prisma.module';
import { CountryService } from './country.service';

@Module({
  imports: [PrismaModule],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
