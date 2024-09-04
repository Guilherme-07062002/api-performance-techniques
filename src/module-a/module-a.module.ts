import { Module } from '@nestjs/common';
import { ModuleAController } from './module-a.controller';

@Module({
  controllers: [ModuleAController],
})
export class ModuleA {}
