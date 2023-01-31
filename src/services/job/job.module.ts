import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/prisma.module';
import { JobService } from './job.service';

@Module({
  imports: [PrismaModule],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
