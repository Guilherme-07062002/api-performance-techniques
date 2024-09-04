import { spawn } from 'child_process';

// Inicia o servidor Express
const expressServer = spawn('ts-node', ['src/express/main.ts'], {
  stdio: 'inherit',
  shell: true,
});

// Inicia o servidor Fastify
const fastifyServer = spawn('ts-node', ['src/fastify/main.ts'], {
  stdio: 'inherit',
  shell: true,
});

// Manipula o fechamento dos servidores
process.on('SIGINT', () => {
  expressServer.kill();
  fastifyServer.kill();
  process.exit();
});
