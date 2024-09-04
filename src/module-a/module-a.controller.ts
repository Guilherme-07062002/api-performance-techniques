import { Controller, Get } from '@nestjs/common';

@Controller()
export class ModuleAController {
  @Get()
  getHello(): { message: string } {
    return { message: 'Express says hello!' };
  }
}
