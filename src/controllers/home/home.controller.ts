import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HomeController {

  @Get()
  async getInfo () {
    return 'API de Cinemas v1';
  }
}
