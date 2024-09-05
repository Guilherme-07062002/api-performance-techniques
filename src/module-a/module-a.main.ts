import { NestFactory } from '@nestjs/core';
import { ModuleA } from './module-a.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(ModuleA, new ExpressAdapter());
  await app.listen(3001, '0.0.0.0');
  console.log('Express microservice running on port 3001');
}
bootstrap();
