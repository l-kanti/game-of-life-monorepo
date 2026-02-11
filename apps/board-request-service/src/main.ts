/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BoardRequestModule } from './app/board-request-service.module';

async function bootstrap() {
  const app = await NestFactory.create(BoardRequestModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 50051;
  await app.listen(port);
  Logger.log(
    `🚀 Board Request Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
