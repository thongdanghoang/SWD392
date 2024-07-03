import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from '@5stones/nest-oidc';
import {UserModule} from './modules/user/user.module';
import {ProductModule} from './modules/product/product.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './modules/user/user.entity';
import {ProductEntity} from 'src/modules/product/entities/product.entity';
import {TransactionsModule} from './modules/transactions/transactions.module';
import {ExchangeEntity} from './modules/transactions/entities/ExchangeEntity';
import {NotificationEntity} from './modules/user/notification.entity';
import {MongooseModule} from '@nestjs/mongoose';
import {ChatModule} from './modules/chat/chat.module';
import {CategoryModule} from './modules/category/category.module';
import {CategoryEntity} from './modules/category/category.entity';

@Module({
  imports: [
    AuthModule.forRoot({
      oidcAuthority: 'https://thongdanghoang.id.vn/auth/realms/SwapMe'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'thongdanghoang.id.vn',
      port: 3306,
      username: 'root',
      password: 'root_P@ssW0rd',
      database: 'swapme_dev',
      entities: [
        UserEntity,
        NotificationEntity,
        ProductEntity,
        ExchangeEntity,
        CategoryEntity
      ],
      synchronize: true
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'), // Kết nối tới MongoDB
    ChatModule,
    UserModule,
    ProductModule,
    TransactionsModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
