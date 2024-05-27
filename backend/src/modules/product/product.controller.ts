import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {ProductService} from './product.service';
import {CreateProductDto} from './product.dto';
import {Product} from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    const newProduct =
      await this.productService.createProduct(createProductDto);
    return newProduct;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): string {
    return this.productService.findAll();
  }
}
