import {PartialType} from '@nestjs/swagger';

export class CreateUserDto {
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
