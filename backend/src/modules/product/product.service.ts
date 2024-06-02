import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProductEntity} from './product.entity';
import {CreateProductDto} from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  async getProductDetails(id: number): Promise<ProductEntity> {
    return this.productRepository.findOneBy({id});
  }
}
