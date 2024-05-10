import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from '@5stones/nest-oidc';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './modules/user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './modules/user/user.entity';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    AuthModule.forRoot({
      oidcAuthority: 'http://localhost:8180/realms/access-guard'
    }),
    MongooseModule.forRoot('mongodb://swd392:swd392@localhost:27017/swd392'),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.mysql.host'),
        port: configService.get('db.mysql.port'),
        username: configService.get('db.mysql.username'),
        password: configService.get('db.mysql.password'),
        database: configService.get('db.mysql.database'),
        entities: [UserEntity],
        synchronize: true
      })
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
