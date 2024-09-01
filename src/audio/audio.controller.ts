import { Controller, Get, Post, Res, Sse } from '@nestjs/common';
import { AudioService } from './audio.service';
import { fromEvent, map, Observable } from 'rxjs';
import { join } from 'path';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('audio')
export class AudioController {
    constructor(
        private readonly audioService: AudioService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    @Get('view')
    renderAudioPlayer(@Res() res: Response) {
        const filePath = join(__dirname, '..', 'public', 'index.html');
        res.sendFile(filePath);
    }

    @Post('process')
    async addJob() {
        console.log('Received job to process audio');
        await this.audioService.processAudio();
        return { message: 'Áudio em processamento' };
    }

    @Sse('sse')
    sse(): Observable<MessageEvent> {
        return fromEvent(this.eventEmitter, 'audio.processed').pipe(
            map((data: any) => {
                return new MessageEvent('message', { data });
            }),
        );
    }

    emitEvent(data: any) {
        this.eventEmitter.emit('audio.processed', data);
    }
}
