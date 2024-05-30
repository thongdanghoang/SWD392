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
import {UserSynchronizedDto} from './user.dtos';
import {UserEntity} from './user.entity';

@Injectable()
export class UserSynchronizeInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(UserSynchronizeInterceptor.name);

  constructor(private readonly usersService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    void this.usersService
      .findOne(user.email)
      .then(result => {
        if (result) {
          this.logger.log('=============Synchronized User================');
        } else {
          this.logger.log('=============Synchronizing User===============');
        }
        return (
          result ??
          this.usersService.create({
            creationDate: new Date(),
            email: user.email,
            emailVerified: user.email_verified,
            firstName: user.given_name,
            lastName: user.family_name
          } as UserSynchronizedDto)
        );
      })
      .then((syncUser: UserEntity) => {
        this.usersService.setCurrentUser(syncUser);
        this.logger.log(`User email: ${syncUser.email}`);
        this.logger.log('==============================================');
      });

    return next
      .handle()
      .pipe(catchError(() => throwError(() => new BadGatewayException())));
  }
}
