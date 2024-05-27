import {Controller, Get, UseGuards} from '@nestjs/common';
import {CurrentUser, JwtAuthGuard} from '@5stones/nest-oidc';
@Controller('user')
export class UsersController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@CurrentUser() user: any): any {
    const {name, preferred_username, given_name, family_name, email} = user;
    return {name, preferred_username, given_name, family_name, email};
  }
}
