import { Controller, Post } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
    constructor(private readonly audioService: AudioService) {}

    @Post('process')
    async addJob() {
        await this.audioService.processAudio();

        return { message: 'Seu áudio foi enviado para a fila de processamento' };
    }
}
