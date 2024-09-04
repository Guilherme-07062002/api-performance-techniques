import { Module } from '@nestjs/common';
import { ModuleA } from './module-a/module-a.module';
import { ModuleB } from './module-b/module-b.module';

@Module({})
export class DynamicModule {
  static register(port: number) {
    let modules = [];
    
    if (port === 3000) {
      // Express modules
      modules = [ModuleA];
    } else if (port === 3001) {
      // Fastify modules
      modules = [ModuleB];
    }

    return {
      module: DynamicModule,
      imports: modules,
    };
  }
}
