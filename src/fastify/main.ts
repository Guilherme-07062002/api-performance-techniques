import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { FastifyModule } from './fastify.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(FastifyModule, new FastifyAdapter());
  await app.listen(3000);
  Logger.log('Fastify server listening on port 3000', 'Bootstrap');
}

bootstrap();
