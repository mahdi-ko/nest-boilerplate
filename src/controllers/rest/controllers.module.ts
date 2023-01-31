import { Module } from '@nestjs/common';

import { PrismaModule } from '~/src/infrastructure/prisma.module';
import { AuthModule } from '~/src/services/auth/auth.module';
import { CompanyAdsModule } from '~/src/services/companyAds/companyAds.module';
import { FileModule } from '~/src/services/file/file.module';
import { JobModule } from '~/src/services/job/job.module';
import { ServiceModule } from '~/src/services/service/service.module';
import { UserModule } from '~/src/services/user/user.module';

import { AuthController } from './auth/auth.controller';
import { CompanyAdsController } from './companyAds/companyAds.controller';
import { FileController } from './file/file.controller';
import { JobController } from './job/job.controller';
import { PlaygroundController } from './playground/playground.controller';
import { ServiceController } from './service/service.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CompanyAdsModule,
    JobModule,
    ServiceModule,
    FileModule,
  ],
  controllers: [
    UserController,
    AuthController,
    CompanyAdsController,
    PlaygroundController,
    JobController,
    ServiceController,
    FileController,
  ],
})
export class ControllersModule {}
