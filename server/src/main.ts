import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use('/files', express.static(join(__dirname, '..', 'files')));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
