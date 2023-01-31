import { Module } from '@nestjs/common';

import { AmenityModule } from '~/src/services/amenity/amenity.module';
import { AuthModule } from '~/src/services/auth/auth.module';
import { CategoryModule } from '~/src/services/category/category.module';
import { CompanyAdsModule } from '~/src/services/companyAds/companyAds.module';
import { CountryModule } from '~/src/services/country/country.module';
import { PrismaModule } from '~/src/infrastructure/prisma.module';
import { ExperienceModule } from '~/src/services/experience/experience.module';
import { FileModule } from '~/src/services/file/file.module';
import { JobModule } from '~/src/services/job/job.module';
import { RealEstateModule } from '~/src/services/realEstate/realEstate.module';
import { RegionModule } from '~/src/services/region/region.module';
import { ServiceModule } from '~/src/services/service/service.module';
import { UserModule } from '~/src/services/user/user.module';
import { VehicleModule } from '~/src/services/vehicle/vehicle.module';

import { AmenityController } from './amenity/amenity.controller';
import { AuthController } from './auth/auth.controller';
import { CategoryController } from './category/category.controller';
import { CompanyAdsController } from './companyAds/companyAds.controller';
import { CountryController } from './country/country.controller';
import { ExperienceController } from './experience/experience.controller';
import { FileController } from './file/file.controller';
import { JobController } from './job/job.controller';
import { PlaygroundController } from './playground/playground.controller';
import { RealEstateController } from './realEstate/realEstate.controller';
import { RegionController } from './region/region.controller';
import { ServiceController } from './service/service.controller';
import { UserController } from './user/user.controller';
import { VehicleController } from './vehicle/vehicle.controller';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CompanyAdsModule,
    CategoryModule,
    JobModule,
    CountryModule,
    RegionModule,
    ServiceModule,
    ExperienceModule,
    RealEstateModule,
    AmenityModule,
    FileModule,
    VehicleModule,
  ],
  controllers: [
    UserController,
    AuthController,
    CompanyAdsController,
    CategoryController,
    PlaygroundController,
    JobController,
    CountryController,
    RegionController,
    ServiceController,
    ExperienceController,
    RealEstateController,
    AmenityController,
    FileController,
    VehicleController,
  ],
})
export class ControllersModule {}
