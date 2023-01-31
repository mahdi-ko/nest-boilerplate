import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/prisma.module';
import { ExperienceService } from './experience.service';

@Module({
  imports: [PrismaModule],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
