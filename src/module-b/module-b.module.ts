import { Module } from '@nestjs/common';
import { ModuleBController } from './module-b.controller';

@Module({
  controllers: [ModuleBController],
})
export class ModuleB {}
