import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {ProductService} from '../services/product.service';
import {
  CreateProductDto,
  ProductDto,
  ProductWithOwnerDTO
} from '../dto/product.dto';
import {ProductEntity, ProductStatus} from '../entities/product.entity';
import {ResponseData} from '../../../global/globalClass';
import {HttpMessage, HttpStatus} from '../../../global/globalEnum';
import {UsersService} from '../../user/users.service';
import {UserDto} from '../../user/user.dto';
import {SearchCriteriaDto, SearchResultDto} from '../../../global/model';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<ResponseData<ProductDto>> {
    try {
      const newProduct = await this.productService.createProduct({
        ...createProductDto,
        owner: this.userService.getCurrentUser().id,
        createdBy: this.userService.getCurrentUser().firstName,
        status: ProductStatus.PUBLISHED
      });
      return new ResponseData(
        this.mapToProductDto(newProduct),
        HttpMessage.CREATED,
        HttpStatus.CREATED
      );
    } catch (error) {
      return new ResponseData<ProductDto>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/my-products')
  @UseGuards(JwtAuthGuard)
  async getMyProducts(): Promise<ResponseData<ProductDto[]>> {
    try {
      return new ResponseData<ProductDto[]>(
        await this.productService
          .getProductsByOwnerIdCanBeExchanged(
            this.userService.getCurrentUser().id
          )
          .then((products: ProductEntity[]): ProductDto[] =>
            products
              .filter(
                (product: ProductEntity): boolean =>
                  product.status === ProductStatus.PUBLISHED
              )
              .map(
                (product: ProductEntity): ProductDto =>
                  this.mapToProductDto(product)
              )
          ),
        HttpMessage.OK,
        HttpStatus.OK
      );
    } catch (error) {
      return new ResponseData<ProductDto[]>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/:id')
  async getProductDetails(
    @Param('id') id: number
  ): Promise<ResponseData<ProductWithOwnerDTO>> {
    try {
      const product = await this.productService.getProductDetails(id);
      const owner = await this.userService.findById(product.owner);
      return new ResponseData(
        this.mapToProductOwnerDto(product, owner),
        HttpMessage.OK,
        HttpStatus.OK
      );
    } catch (error) {
      return new ResponseData<ProductWithOwnerDTO>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('/search')
  @HttpCode(200)
  async searchProducts(
    @Body() criteria: SearchCriteriaDto<string>
  ): Promise<SearchResultDto<ProductDto>> {
    try {
      const searchResultEntity =
        await this.productService.searchProducts(criteria);
      return {
        results: searchResultEntity.results.map(
          (product: ProductEntity): ProductDto => this.mapToProductDto(product)
        ),
        total: searchResultEntity.total
      } as SearchResultDto<ProductDto>;
    } catch (error) {
      return {
        results: [],
        total: 0
      } as SearchResultDto<ProductDto>;
    }
  }

  private mapToProductDto(product: ProductEntity): ProductDto {
    return {
      id: product.id,
      version: product.version,
      createdBy: product.createdBy,
      lastModificationDate: product.lastModificationDate,
      title: product.title,
      summary: product.summary,
      images: product.images,
      video: product.video,
      suggestedPrice: product.suggestedPrice,
      modifiedBy: product.modifiedBy,
      creationDate: product.creationDate,
      status: product.status,
      isMyProduct: this.userService.getCurrentUser()
        ? product.owner === this.userService.getCurrentUser()?.id
        : false
    } as ProductDto;
  }

  private mapToProductOwnerDto(
    product: ProductEntity,
    owner: UserDto
  ): ProductWithOwnerDTO {
    return {
      id: product.id,
      version: product.version,
      createdBy: product.createdBy,
      lastModificationDate: product.lastModificationDate,
      title: product.title,
      summary: product.summary,
      images: product.images,
      video: product.video,
      suggestedPrice: product.suggestedPrice,
      modifiedBy: product.modifiedBy,
      creationDate: product.creationDate,
      status: product.status,
      isMyProduct: this.userService.getCurrentUser()
        ? product.owner === this.userService.getCurrentUser()?.id
        : false,
      owner: {
        id: owner.id,
        version: owner.version,
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        phone: owner.phone,
        status: owner.status
      } as UserDto
    } as ProductWithOwnerDTO;
  }
}
