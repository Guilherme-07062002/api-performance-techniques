import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamicModule } from './dynamic.module';

@Module({
  imports: [DynamicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
