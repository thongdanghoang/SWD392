import {Controller, Get, Param, Patch, UseGuards} from '@nestjs/common';
import {JwtAuthGuard, Roles} from '@5stones/nest-oidc';
import {ProductService} from '../services/product.service';
import {ProductDto} from '../dto/product.dto';
import {ProductEntity, ProductStatus} from '../entities/product.entity';
import {ResponseData} from '../../../global/globalClass';
import {HttpMessage, HttpStatus} from '../../../global/globalEnum';
import {UsersService} from '../../user/users.service';

@Controller('products')
export class ProductModeratorController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService
  ) {}

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
}
