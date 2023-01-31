import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { RealEstateService } from '../services/realEstate/realEstate.service';
import { UserService } from '../services/user/user.service';
import { VehicleService } from '../services/vehicle/vehicle.service';

@Injectable()
export class PremiumTaskSchedule {
  constructor(
    private readonly userService: UserService,
    private readonly realEstateService: RealEstateService,
    private readonly vehicleService: VehicleService,
  ) {}

  @Cron('0 * * * *')
  async updateUsersPremium() {
    console.log('updateUsersPremium');
    return this.userService.updateUsersPremium();
  }

  @Cron('10 * * * *')
  async updateRealEstatesPremium() {
    console.log('updateRealEstatesPremium');
    return this.realEstateService.updateRealEstatesPremium();
  }

  @Cron('20 * * * *')
  async updateVehiclesPremium() {
    console.log('updateVehiclesPremium');
    return this.vehicleService.updateVehiclesPremium();
  }
}
