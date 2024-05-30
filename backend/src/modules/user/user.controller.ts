import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {UsersService} from './users.service';
import {UserEntity} from './user.entity';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUser(): UserEntity {
    return this.usersService.getCurrentUser();
  }
}
