import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {ProductService} from './product.service';
import {CreateProductDto} from './product.dto';
import {ProductEntity, ProductStatus} from './product.entity';
import {ResponseData} from '../../global/globalClass';
import {HttpMessage, HttpStatus} from '../../global/globalEnum';
import {UsersService} from '../user/users.service';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService
  ) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<ResponseData<ProductEntity>> {
    try {
      const newProduct = await this.productService.createProduct({
        ...createProductDto,
        owner: this.userService.getCurrentUser().id,
        createdBy: this.userService.getCurrentUser().firstName,
        status: ProductStatus.PUBLISHED
      });
      return new ResponseData(
        newProduct,
        HttpMessage.CREATED,
        HttpStatus.CREATED
      );
    } catch (error) {
      return new ResponseData<ProductEntity>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/:id')
  async getProductDetails(
    @Param('id') id: number
  ): Promise<ResponseData<ProductEntity>> {
    try {
      const product = await this.productService.getProductDetails(id);
      return new ResponseData(product, HttpMessage.OK, HttpStatus.OK);
    } catch (error) {
      return new ResponseData<ProductEntity>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async getAllProducts(): Promise<ResponseData<ProductEntity[]>> {
    try {
      const products = await this.productService.getAllProducts();
      return new ResponseData<ProductEntity[]>(
        products,
        HttpMessage.OK,
        HttpStatus.OK
      );
    } catch (error) {
      return new ResponseData<ProductEntity[]>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
