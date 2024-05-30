import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserCreateEntity, UserEntity} from './user.entity';

@Injectable()
export class UsersService {
  private currentUser: UserEntity;

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  getCurrentUser(): UserEntity {
    return this.currentUser;
  }

  setCurrentUser(user: UserEntity): void {
    this.currentUser = user;
  }

  create(user: UserCreateEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  findOne(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({email});
  }
}
