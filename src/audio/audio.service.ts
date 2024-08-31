import { Injectable } from '@nestjs/common';

@Injectable()
export class AudioService {
    async processAudio() {
        console.log('processing audio...');
        await fetch('https://httpbin.org/delay/10')
        console.log('audio processed');
    }
}
