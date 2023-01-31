import { Module } from '@nestjs/common';

import { AuthModule } from '~/src/services/auth/auth.module';
import { CompanyAdsModule } from '~/src/services/companyAds/companyAds.module';
import { PrismaModule } from '~/src/infrastructure/prisma.module';
import { ExperienceModule } from '~/src/services/experience/experience.module';
import { FileModule } from '~/src/services/file/file.module';
import { JobModule } from '~/src/services/job/job.module';
import { RealEstateModule } from '~/src/services/realEstate/realEstate.module';
import { ServiceModule } from '~/src/services/service/service.module';
import { UserModule } from '~/src/services/user/user.module';
import { VehicleModule } from '~/src/services/vehicle/vehicle.module';

import { AuthController } from './auth/auth.controller';
import { CompanyAdsController } from './companyAds/companyAds.controller';
import { ExperienceController } from './experience/experience.controller';
import { FileController } from './file/file.controller';
import { JobController } from './job/job.controller';
import { PlaygroundController } from './playground/playground.controller';
import { RealEstateController } from './realEstate/realEstate.controller';
import { ServiceController } from './service/service.controller';
import { UserController } from './user/user.controller';
import { VehicleController } from './vehicle/vehicle.controller';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CompanyAdsModule,
    JobModule,
    ServiceModule,
    ExperienceModule,
    RealEstateModule,
    FileModule,
    VehicleModule,
  ],
  controllers: [
    UserController,
    AuthController,
    CompanyAdsController,
    PlaygroundController,
    JobController,
    ServiceController,
    ExperienceController,
    RealEstateController,
    FileController,
    VehicleController,
  ],
})
export class ControllersModule {}
