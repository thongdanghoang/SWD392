import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {ProductEntity, ProductStatus} from '../entities/product.entity';
import {CreateProductDto, UpdateProductDto} from '../dto/product.dto';
import {
  SearchCriteriaDto,
  SearchResultDto,
  defaultSearchCriteria
} from '../../../global/model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async searchProducts(
    criteria: SearchCriteriaDto<string> = defaultSearchCriteria('')
  ): Promise<SearchResultDto<ProductEntity>> {
    const [results, total] = await this.productRepository.findAndCount({
      where: [
        {
          title: Like(`%${criteria.criteria}%`),
          status: ProductStatus.PUBLISHED
        },
        {
          summary: Like(`%${criteria.criteria}%`),
          status: ProductStatus.PUBLISHED
        }
      ],
      skip: criteria.page.offset,
      take: criteria.page.limit,
      order: {creationDate: 'DESC'}
    });
    return {results, total};
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

  async updateProductStatus(id: number, status: ProductStatus): Promise<void> {
    await this.productRepository.update(id, {status});
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
