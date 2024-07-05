import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from '../user/user.module';
import {ExchangeRequestService} from './services/exchange-request.service';
import {ExchangeRequestController} from './web/exchange-request.controller';
import {ProductModule} from '../product/product.module';
import {ExchangeEntity} from './entities/ExchangeEntity';
import {ExchangeController} from './web/exchange.controller';
import {ExchangeService} from './services/exchange.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeEntity]),
    UserModule,
    ProductModule
  ],
  providers: [ExchangeRequestService, ExchangeService],
  exports: [ExchangeRequestService, ExchangeService],
  controllers: [ExchangeController, ExchangeRequestController]
})
export class TransactionsModule {}
