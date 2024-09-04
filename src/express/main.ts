import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DynamicModule } from '../dynamic.module';

async function bootstrap() {
  const app = await NestFactory.create(
    DynamicModule.register(3000),
    new ExpressAdapter(),
  );
  await app.listen(3000, () => {
    console.log(`Express rodando na porta 3000`);
  });
}

bootstrap();
