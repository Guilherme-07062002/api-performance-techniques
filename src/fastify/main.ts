import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DynamicModule } from '../dynamic.module';

async function bootstrap() {
  const app = await NestFactory.create(
    DynamicModule.register(3001),
    new FastifyAdapter(),
  );
  await app.listen(3001, () => {
    console.log(`Fastify rodando na porta 3001`);
  });
}

bootstrap();
