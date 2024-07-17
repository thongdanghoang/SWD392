import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductEntity} from './entities/product.entity';
import {ProductService} from './services/product.service';
import {ProductController} from './web/product.controller';
import {UserModule} from '../user/user.module';
import {ProductModeratorController} from './web/product.moderator.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), UserModule],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductModeratorController, ProductController]
})
export class ProductModule {}
