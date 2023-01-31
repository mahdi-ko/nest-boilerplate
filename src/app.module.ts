import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';

import { ControllersModule } from './controllers/rest/controllers.module';
import { AuthGuard } from './core/guards/auth.guard';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ControllersModule,
    TasksModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 20,
      limit: 10,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
