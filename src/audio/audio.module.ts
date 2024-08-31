import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { AudioProcessorQueue } from './audio-processor.queue';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        BullModule.registerQueue({
        name: 'audio-processor-queue',
    }),
  ],
  controllers: [AudioController],
  providers: [AudioService, AudioProcessorQueue],
  exports: [AudioService],
})
export class AudioModule {}
