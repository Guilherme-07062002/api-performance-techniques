import * as dotenv from 'dotenv';
import { spawn } from 'child_process';
import { Logger } from '@nestjs/common';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Verifica a variável de ambiente para decidir qual servidor iniciar
const serverType = process.env.SERVER_TYPE; // 'express' ou 'fastify'

// Inicia o servidor Express ou Fastify com base na variável
let serverProcess;

if (serverType === 'express') {
  serverProcess = spawn('ts-node', ['src/express/main.ts'], {
    stdio: 'inherit',
    shell: true,
  });
  Logger.log('Starting Express server...','INFO');
} else if (serverType === 'fastify') {
  serverProcess = spawn('ts-node', ['src/fastify/main.ts'], {
    stdio: 'inherit',
    shell: true,
  });
  Logger.log('Starting Fastify server...','INFO');
} else {
  Logger.error('Tipo de servidor inválido. Use "express" ou "fastify".','INFO');
  process.exit(1);
}

// Manipula o fechamento do servidor
process.on('SIGINT', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  process.exit();
});
