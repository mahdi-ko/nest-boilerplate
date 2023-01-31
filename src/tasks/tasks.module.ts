import { Module } from '@nestjs/common';

import { ExampleTaskScheduler } from './example.task';

@Module({
  imports: [],
  providers: [ExampleTaskScheduler],
})
export class TasksModule {}
