import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import * as path from 'path';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AudioService {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    async processAudio(clientId: string) {
        const scriptPath = path.resolve(__dirname, '../audio/audio.worker.js');

        const worker = new Worker(scriptPath, {
            workerData: { data: 'processing audio', clientId },
        });

        worker.on('message', (message) => this.handleWorkerMessage(message, clientId));
        worker.on('error', this.handleWorkerError);
        worker.on('exit', this.handleWorkerExit);
    }

    private handleWorkerMessage(message: any, clientId: string) {
        console.log('Received from worker:', message);
        this.eventEmitter.emit('audio.processed', { clientId, message });
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
