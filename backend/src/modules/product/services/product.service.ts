import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProductEntity} from '../entities/product.entity';
import {CreateProductDto, UpdateProductDto} from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async getAllProductsPublished(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductsByOwnerIdCanBeExchanged(
    owner: number
  ): Promise<ProductEntity[]> {
    return await this.productRepository.findBy({
      owner
    });
  }

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  async updateProduct(
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    await this.productRepository.update(updateProductDto.id, updateProductDto);
    return this.productRepository.findOneBy({id: updateProductDto.id});
  }

  async getProductDetails(id: number): Promise<ProductEntity> {
    return this.productRepository.findOneBy({id});
  }
}
