import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';

@Controller()
export class AppController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): any {
    return 'Hello World!';
  }
}
