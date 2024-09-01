import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import * as path from 'path';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AudioService {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    async processAudio() {
        const scriptPath = path.resolve(__dirname, '../audio/audio.worker.js');

        const worker = new Worker(scriptPath, {
            workerData: { data: 'processing audio' },
        });

        worker.on('message', this.handleWorkerMessage.bind(this));
        worker.on('error', this.handleWorkerError.bind(this));
        worker.on('exit', this.handleWorkerExit.bind(this));
    }

    private handleWorkerMessage(message: any) {
        console.log('Received from worker:', message);
        this.eventEmitter.emit('audio.processed', message);
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
