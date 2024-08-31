/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cluster from 'cluster';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Worker ${process.pid} is running on http://localhost:3000`);
}

if ((cluster as any).isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    (cluster as any).fork();
  }

  // If a worker dies, log it and fork a new one
  (cluster as any).on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    (cluster as any).fork();
  });

} else {
  // Workers can share any TCP connection
  // In this case, it is an HTTP server
  bootstrap();
}