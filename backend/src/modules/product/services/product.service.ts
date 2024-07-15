import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {ProductEntity, ProductStatus} from '../entities/product.entity';
import {
  CreateProductDto,
  ProductSearchCriteria,
  UpdateProductDto
} from '../dto/product.dto';
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
    searchCriteria: SearchCriteriaDto<ProductSearchCriteria> = defaultSearchCriteria(
      null
    )
  ): Promise<SearchResultDto<ProductEntity>> {
    const queryCondition = [
      {
        status: ProductStatus.PUBLISHED
      }
    ];
    this.buildQuerySearchByCategoryAndKeyword(searchCriteria, queryCondition);
    const [results, total] = await this.productRepository.findAndCount({
      where: queryCondition,
      skip: searchCriteria.page.offset,
      take: searchCriteria.page.limit,
      order: {creationDate: 'DESC'}
    });
    return {results, total};
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({order: {status: 'ASC'}});
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

  async getProductsByUserId(owner: number): Promise<ProductEntity[]> {
    return await this.productRepository.findBy({owner});
  }

  private buildQuerySearchByCategoryAndKeyword(
    searchCriteria: SearchCriteriaDto<ProductSearchCriteria>,
    queryCondition: any[]
  ): void {
    if (
      searchCriteria?.criteria?.categoryId &&
      searchCriteria?.criteria?.keyword
    ) {
      queryCondition.push(
        {
          title: Like(`%${searchCriteria.criteria.keyword}%`),
          category: searchCriteria.criteria.categoryId
        },
        {
          summary: Like(`%${searchCriteria.criteria.keyword}%`),
          category: searchCriteria.criteria.categoryId
        }
      );
    } else {
      this.buildQuerySearchByCategory(searchCriteria, queryCondition);
      this.buildQuerySearchByKeyword(searchCriteria, queryCondition);
    }
  }

  private buildQuerySearchByKeyword(
    searchCriteria: SearchCriteriaDto<ProductSearchCriteria>,
    queryCondition: any[]
  ): void {
    if (searchCriteria?.criteria?.keyword) {
      queryCondition.push(
        {
          title: Like(`%${searchCriteria.criteria.keyword}%`)
        },
        {
          summary: Like(`%${searchCriteria.criteria.keyword}%`)
        }
      );
    }
  }

  private buildQuerySearchByCategory(
    searchCriteria: SearchCriteriaDto<ProductSearchCriteria>,
    queryCondition: any[]
  ): void {
    if (searchCriteria?.criteria?.categoryId) {
      queryCondition.push({
        category: searchCriteria.criteria.categoryId
      });
    }
  }
}
