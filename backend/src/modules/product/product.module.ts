import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductEntity} from './entities/product.entity';
import {ProductService} from './services/product.service';
import {ProductController} from './web/product.controller';
import {UserModule} from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), UserModule],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
