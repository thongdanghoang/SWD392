import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {JwtAuthGuard, Roles} from '@5stones/nest-oidc';
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
import {UserEntity} from '../../user/user.entity';

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
        createdBy: `${this.userService.getCurrentUser().firstName} ${this.userService.getCurrentUser().lastName}`,
        modifiedBy: `${this.userService.getCurrentUser().firstName} ${this.userService.getCurrentUser().lastName}`,
        status: ProductStatus.REVIEWING
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

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id') id: number,
    @Body() createProductDto: CreateProductDto
  ): Promise<ResponseData<ProductDto>> {
    try {
      const updatedProduct: ProductEntity =
        await this.productService.updateProduct({
          ...createProductDto,
          modifiedBy: `${this.userService.getCurrentUser().firstName} ${this.userService.getCurrentUser().lastName}`
        });
      return new ResponseData(
        this.mapToProductDto(updatedProduct),
        HttpMessage.OK,
        HttpStatus.OK
      );
    } catch (error) {
      return new ResponseData<ProductDto>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: number): Promise<void> {
    try {
      const product: ProductEntity =
        await this.productService.getProductDetails(id);
      if (
        product.owner === this.userService.getCurrentUser().id &&
        (product.status === ProductStatus.REVIEWING ||
          product.status === ProductStatus.PUBLISHED)
      ) {
        return await this.productService.updateProductStatus(
          id,
          ProductStatus.REMOVED
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error('Delete product failed');
    }
    throw new Error('Delete product failed');
  }

  @Get('/moderator')
  @UseGuards(JwtAuthGuard)
  @Roles('swapme.moderator')
  async getMyProductsAsModerator(): Promise<ResponseData<ProductDto[]>> {
    try {
      return new ResponseData<ProductDto[]>(
        await this.productService
          .getAllProducts()
          .then((products: ProductEntity[]): ProductDto[] =>
            products.map(
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

  @Patch('/moderator/accept/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('swapme.moderator')
  async acceptProduct(@Param('id') id: number): Promise<void> {
    try {
      const product: ProductEntity =
        await this.productService.getProductDetails(id);
      if (product.status === ProductStatus.REVIEWING) {
        return await this.productService.updateProductStatus(
          id,
          ProductStatus.PUBLISHED
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error('Accept product failed');
    }
    throw new Error('Accept product failed');
  }

  @Patch('/moderator/reject/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('swapme.moderator')
  async rejectProduct(@Param('id') id: number): Promise<void> {
    try {
      const product: ProductEntity =
        await this.productService.getProductDetails(id);
      if (product.status === ProductStatus.REVIEWING) {
        return await this.productService.updateProductStatus(
          id,
          ProductStatus.BANNED
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error('Reject product failed');
    }
    throw new Error('Reject product failed');
  }

  @Patch('/moderator/remove/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('swapme.moderator')
  async removeProduct(@Param('id') id: number): Promise<void> {
    try {
      const product: ProductEntity =
        await this.productService.getProductDetails(id);
      if (product.status === ProductStatus.PUBLISHED) {
        return await this.productService.updateProductStatus(
          id,
          ProductStatus.REMOVED
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error('Reject product failed');
    }
    throw new Error('Reject product failed');
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
            products.map(
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

  @Get('/for-exchange')
  @UseGuards(JwtAuthGuard)
  async getMyProductsForExchange(): Promise<ResponseData<ProductDto[]>> {
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
      const product: ProductEntity =
        await this.productService.getProductDetails(id);
      const owner: UserEntity = await this.userService.findById(product.owner);
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
  @Get('/user/:userId/products')
  async getProductsByUserId(
    @Param('userId') userId: number
  ): Promise<ResponseData<ProductDto[]>> {
    try {
      const products: ProductEntity[] =
        await this.productService.getProductsByUserId(userId);
      const productDtos: ProductDto[] = products.map(product =>
        this.mapToProductDto(product)
      );
      return new ResponseData<ProductDto[]>(
        productDtos,
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

  private mapToProductDto(product: ProductEntity): ProductDto {
    return {
      id: product.id,
      version: product.version,
      createdBy: product.createdBy,
      lastModificationDate: product.lastModificationDate,
      title: product.title,
      isGiveAway: product.isGiveAway,
      isUsed: product.isUsed,
      summary: product.summary,
      images: product.images,
      video: product.video,
      category: product.category,
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
      isGiveAway: product.isGiveAway,
      isUsed: product.isUsed,
      summary: product.summary,
      wardCode: product.wardCode,
      districtCode: product.districtCode,
      provinceCode: product.provinceCode,
      addressDetail: product.addressDetail,
      images: product.images,
      video: product.video,
      suggestedPrice: product.suggestedPrice,
      modifiedBy: product.modifiedBy,
      creationDate: product.creationDate,
      status: product.status,
      isMyProduct: this.userService.getCurrentUser()
        ? product.owner === this.userService.getCurrentUser()?.id
        : false,
      owner: this.mapToUserOwnerDto(owner)
    } as ProductWithOwnerDTO;
  }

  private mapToUserOwnerDto(owner: UserDto): UserDto {
    return {
      id: owner.id,
      version: owner.version,
      firstName: owner.firstName,
      lastName: owner.lastName,
      avatar: owner.avatar,
      email: owner.email,
      phone: owner.phone,
      status: owner.status
    } as UserDto;
  }
}
