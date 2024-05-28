import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {ProductService} from './product.service';
import {CreateProductDto} from './product.dto';
import {Product} from './product.entity';
import {ResponseData} from '../../global/globalClass';
import {HttpMessage, HttpStatus} from '../../global/globalEnum';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<ResponseData<Product>> {
    try {
      const newProduct =
        await this.productService.createProduct(createProductDto);
      return new ResponseData(
        newProduct,
        HttpMessage.CREATED,
        HttpStatus.CREATED
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/:id')
  async getProductDetails(
    @Param('id') id: number
  ): Promise<ResponseData<Product>> {
    try {
      const product = await this.productService.getProductDetails(id);
      return new ResponseData(product, HttpMessage.OK, HttpStatus.OK);
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async getAllProducts(): Promise<ResponseData<Product[]>> {
    try {
      const products = await this.productService.getAllProducts();
      return new ResponseData<Product[]>(
        products,
        HttpMessage.OK,
        HttpStatus.OK
      );
    } catch (error) {
      return new ResponseData<Product[]>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
