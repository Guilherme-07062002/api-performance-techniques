/* eslint-disable @typescript-eslint/no-unused-vars */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio-processor-queue')
export class AudioProcessorQueue {
  @Process()
  async handleJob(job: any) {
      console.log('Processing job...');
      await fetch('https://httpbin.org/delay/10');
      console.log('Job processed');
  }
}