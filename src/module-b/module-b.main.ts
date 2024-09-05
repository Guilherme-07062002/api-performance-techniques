import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ModuleB } from './module-b.module';

async function bootstrap() {
  const app = await NestFactory.create(ModuleB, new FastifyAdapter());
  await app.listen(3002, '0.0.0.0');
  console.log('Fastify microservice running on port 3002');
}
bootstrap();
