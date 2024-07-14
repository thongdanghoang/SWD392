import {Body, Controller, Get, Param, Patch, UseGuards} from '@nestjs/common';
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

  @Patch('avatar')
  updateAvatar(@Body() avatar: {avatarUrl: string}): Promise<UserEntity> {
    const updated: UserEntity = {
      ...this.usersService.getCurrentUser(),
      avatar: avatar.avatarUrl
    };
    return this.usersService.save(updated);
  }

  @Patch('name')
  updateUserFullName(
    @Body() body: {firstName: string; lastName: string}
  ): Promise<UserEntity> {
    const updated: UserEntity = {
      ...this.usersService.getCurrentUser(),
      ...body
    };
    return this.usersService.save(updated);
  }

  @Patch('address')
  updateUserAddress(
    @Body()
    body: {
      provinceCode: string;
      districtCode: string;
      wardCode: string;
      addressDetail: string;
    }
  ): Promise<UserEntity> {
    const updated: UserEntity = {
      ...this.usersService.getCurrentUser(),
      ...body
    };
    return this.usersService.save(updated);
  }

  @Patch('phone')
  updateUserPhone(@Body() body: {phone: string}): Promise<UserEntity> {
    // check phone number format in vietnam format '0xxxxxxxxx'
    if (!/^0\d{9}$/.test(body.phone)) {
      throw new Error('Invalid phone number');
    }
    const updated: UserEntity = {
      ...this.usersService.getCurrentUser(),
      ...body
    };
    return this.usersService.save(updated);
  }
}
