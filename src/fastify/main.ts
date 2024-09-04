import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { FastifyModule } from './fastify.module';

async function bootstrap() {
  const app = await NestFactory.create(FastifyModule, new FastifyAdapter());
  await app.listen(3001);
  console.log('Fastify server listening on port 3001');
}

bootstrap();
