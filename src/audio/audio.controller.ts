import { Controller, Get, Post, Res, Sse, Req, Query } from '@nestjs/common';
import { AudioService } from './audio.service';
import { Response, Request } from 'express';
import { Observable, Subject } from 'rxjs';
import { join } from 'path';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('audio')
export class AudioController {
    private readonly clients = new Map<string, Subject<MessageEvent>>();

    constructor(private readonly audioService: AudioService) {}

    @Get('view')
    renderAudioPlayer(@Res() res: Response) {
        res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    }

    @Post('process')
    async addJob(@Query('clientId') clientId: string) {
        await this.audioService.processAudio(clientId);

        return { message: 'Áudio em processamento' };
    }

    @Sse('sse')
    sse(@Req() req: Request, @Query('clientId') clientId: string): Observable<MessageEvent> {
        console.log('Client connected:', clientId);
        const subject = new Subject<MessageEvent>();
        if (clientId) this.clients.set(clientId, subject);

        req.on('close', () => this.clients.delete(clientId));        
        return subject.asObservable();
    }

    @OnEvent('audio.processed')
    emitEvent(payload: { clientId: string; message: string }) {
        const messageEvent = new MessageEvent('message', payload.message as MessageEventInit<unknown>);
        const subject = this.clients.get(payload.clientId);

        console.log('Emitting event to client:', payload.clientId);
        if (subject) subject.next(messageEvent);
    }
}
