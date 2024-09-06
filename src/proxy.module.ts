import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Module({})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Proxy para o serviço NestJS que usa Express
    consumer
      .apply(
        createProxyMiddleware({
          target: 'http://localhost:3001', // URL do serviço Express
          changeOrigin: true,
        }),
      )
      .forRoutes('/express'); // Rota para o serviço Express

    // Proxy para o serviço NestJS que usa Fastify
    consumer
      .apply(
        createProxyMiddleware({
          target: 'http://localhost:3002', // URL do serviço Fastify
          changeOrigin: true,
        }),
      )
      .forRoutes('/fastify'); // Rota para o serviço Fastify
  }
}
