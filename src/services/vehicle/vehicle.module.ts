import { Module } from '@nestjs/common';

import { PrismaModule } from '../../infrastructure/prisma.module';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [PrismaModule],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
