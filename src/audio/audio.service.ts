import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AudioService {
    constructor(
        @InjectQueue('audio-processor-queue') private audioQueue: Queue
    ){}

    async processAudio() {
        await this.audioQueue.add('process-audio', { file: 'audio.mp3' });
    }
}
