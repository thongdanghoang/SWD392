import {UserStatus} from './user.entity';

export class UserSynchronizedDto {
  creationDate: Date;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
}

export class UserDto {
  id: number;
  version: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string;
  status: UserStatus;
}
