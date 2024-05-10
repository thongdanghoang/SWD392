import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {CreateUserDto} from './user.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  create(user: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  findOne(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({username});
  }
}
