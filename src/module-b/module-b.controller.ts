import { Controller, Get } from '@nestjs/common';

@Controller()
export class ModuleBController {
  @Get()
  getHello(): { message: string } {
    return { message: 'Fastify says hello!' };
  }
}
