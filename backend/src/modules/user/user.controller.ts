import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
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

  @Get('logout')
  signout(): void {
    return this.usersService.setCurrentUser(null);
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<UserEntity | null> {
    return this.usersService.findById(id);
  }

  @Post('avatar')
  updateAvatar(@Body() avatar: {avatarUrl: string}): Promise<UserEntity> {
    const updated: UserEntity = {
      ...this.usersService.getCurrentUser(),
      avatar: avatar.avatarUrl
    };
    return this.usersService.save(updated);
  }
}
