import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import * as path from 'path';

@Injectable()
export class AudioService {
    async processAudio() {
        // Caminho para o script que será executado na thread secundária
        const scriptPath = path.join(__dirname, '../audio/audio.worker.js');

        // Cria uma nova thread para o processamento
        const worker = new Worker(scriptPath, {
            workerData: { data: 'processing audio' }, // Dados que serão passados para o worker
        });

        // Manipula a saída da thread
        worker.on('message', (message) => {
            console.log('Received from worker:', message);
        });

        // Manipula erros da thread
        worker.on('error', (error) => {
            console.error('Error in worker:', error);
        });

        // Manipula a saída da thread
        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            } else {
                console.log('Worker exited successfully');
            }
        });
    }
}
