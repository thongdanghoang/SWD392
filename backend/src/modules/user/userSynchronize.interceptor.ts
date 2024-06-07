import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import {Observable, catchError, throwError} from 'rxjs';
import {UsersService} from './users.service';
import {UserSynchronizedDto} from './user.dto';
import {UserEntity} from './user.entity';

@Injectable()
export class UserSynchronizeInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(UserSynchronizeInterceptor.name);
  private readonly locks: Record<string, boolean> = {};
  private readonly LOCK_CHECK_INTERVAL_MS: number = 100;

  constructor(private readonly usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user) {
      await this.synchronizeUser(user);
    }
    return next
      .handle()
      .pipe(catchError(() => throwError(() => new BadGatewayException())));
  }

  private async synchronizeUser(user: any): Promise<void> {
    while (this.locks[user.email]) {
      await new Promise(resolve =>
        setTimeout(resolve, this.LOCK_CHECK_INTERVAL_MS)
      );
    }
    this.locks[user.email] = true;
    try {
      await this.usersService
        .findOne(user.email)
        .then((result: UserEntity) => {
          if (result) {
            this.logger.log('=============Synchronized User================');
          } else {
            this.logger.log('=============Synchronizing User===============');
          }
          return (
            result ?? this.usersService.create(this.synchronizedUser(user))
          );
        })
        .then((syncUser: UserEntity) => {
          this.usersService.setCurrentUser(syncUser);
          this.logger.log(`User email: ${syncUser.email}`);
          this.logger.log('==============================================');
        });
    } finally {
      delete this.locks[user.email];
    }
  }

  private synchronizedUser(iamUser: any): UserSynchronizedDto {
    return {
      creationDate: new Date(),
      email: iamUser.email,
      emailVerified: iamUser.email_verified,
      firstName: iamUser.given_name,
      lastName: iamUser.family_name
    } as UserSynchronizedDto;
  }
}
