import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/prisma.module';
import { ServiceService } from './service.service';

@Module({
  imports: [PrismaModule],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
