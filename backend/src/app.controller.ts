import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  @Get()
  getHello(): any {
    return 'Hello World!';
  }
}
