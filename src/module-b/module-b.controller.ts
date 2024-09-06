import { Controller, Get } from '@nestjs/common';

@Controller()
export class ModuleBController {
  @Get('fastify')
  getHello(): { message: string } {
    return { message: 'Fastify says hello!' };
  }
}
