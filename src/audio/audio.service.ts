import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import * as path from 'path';

@Injectable()
export class AudioService {
    async processAudio() {
        const scriptPath = path.resolve(__dirname, '../audio/audio.worker.js');

        const worker = new Worker(scriptPath, {
            workerData: { data: 'processing audio' },
        });

        worker.on('message', this.handleWorkerMessage);
        worker.on('error', this.handleWorkerError);
        worker.on('exit', this.handleWorkerExit);
    }

    private handleWorkerMessage(message: any) {
        console.log('Received from worker:', message);
    }

    private handleWorkerError(error: Error) {
        console.error('Error in worker:', error);
    }

    private handleWorkerExit(code: number) {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        } else {
            console.log('Worker exited successfully');
        }
    }
}
