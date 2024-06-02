import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductEntity} from './product.entity';
import {ProductService} from './product.service';
import {ProductController} from './product.controller';
import {UserModule} from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), UserModule],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
