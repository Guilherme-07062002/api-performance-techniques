import { Injectable } from '@nestjs/common';

@Injectable()
export class AudioService {
    async processAudio() {
        await new Promise((resolve) => setTimeout(resolve, 10000));
    }
}
