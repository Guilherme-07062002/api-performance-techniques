import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ExpressModule } from './express.module';
import * as express from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    ExpressModule,
    new ExpressAdapter(server),
  );
  await app.listen(3000);
  Logger.log('Express server listening on port 3000', 'Bootstrap');
}

bootstrap();
