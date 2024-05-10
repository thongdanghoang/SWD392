import {Controller, Get, UseGuards} from '@nestjs/common';
import {CurrentUser, JwtAuthGuard} from '@5stones/nest-oidc';

@Controller()
export class AppController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): any {
    return 'Hello World!';
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUser(@CurrentUser() user: any): any {
    return user;
  }
}
