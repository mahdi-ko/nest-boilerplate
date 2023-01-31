import { NestFactory } from '@nestjs/core';
import express from 'express';

import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptors/response.interceptor';
import { StrictValidationPipe } from './core/validations/validationPipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(StrictValidationPipe);
  app.enableCors();
  app.use(express.static('public'));
  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
