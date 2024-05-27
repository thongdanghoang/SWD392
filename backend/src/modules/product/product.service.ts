import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Product} from './product.entity';
import {CreateProductDto} from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  findAll(): string {
    return 'Hello World!';
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating product');
    }
  }
}
