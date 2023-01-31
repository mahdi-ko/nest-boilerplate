import { Module } from '@nestjs/common';

import { RealEstateModule } from '../services/realEstate/realEstate.module';
import { UserModule } from '../services/user/user.module';
import { VehicleModule } from '../services/vehicle/vehicle.module';
import { PremiumTaskSchedule } from './premium.task';

@Module({
  imports: [UserModule, RealEstateModule, VehicleModule],
  providers: [PremiumTaskSchedule],
})
export class TasksModule {}
