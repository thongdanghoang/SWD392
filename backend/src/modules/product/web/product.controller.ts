import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {ProductService} from '../services/product.service';
import {CreateProductDto, ProductOwnerDto} from '../dto/product.dto';
import {ProductEntity, ProductStatus} from '../entities/product.entity';
import {ResponseData} from '../../../global/globalClass';
import {HttpMessage, HttpStatus} from '../../../global/globalEnum';
import {UsersService} from '../../user/users.service';
import {UserDto} from '../../user/user.dto';

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
  ): Promise<ResponseData<ProductEntity>> {
    try {
      const newProduct = await this.productService.createProduct({
        ...createProductDto,
        owner: this.userService.getCurrentUser().id,
        createdBy: this.userService.getCurrentUser().firstName,
        status: ProductStatus.PUBLISHED
      });
      return new ResponseData(
        newProduct,
        HttpMessage.CREATED,
        HttpStatus.CREATED
      );
    } catch (error) {
      return new ResponseData<ProductEntity>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/my-products')
  @UseGuards(JwtAuthGuard)
  async getMyProducts(): Promise<ResponseData<ProductEntity[]>> {
    try {
      return new ResponseData<ProductEntity[]>(
        await this.productService.getProductsByOwnerIdCanBeExchanged(
          this.userService.getCurrentUser().id
        ),
        HttpMessage.OK,
        HttpStatus.OK
      );
    } catch (error) {
      return new ResponseData<ProductEntity[]>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/:id')
  async getProductDetails(
    @Param('id') id: number
  ): Promise<ResponseData<ProductOwnerDto>> {
    try {
      const product = await this.productService.getProductDetails(id);
      const owner = await this.userService.findById(product.owner);
      return new ResponseData(
        this.mapToProductOwnerDto(product, owner),
        HttpMessage.OK,
        HttpStatus.OK
      );
    } catch (error) {
      return new ResponseData<ProductOwnerDto>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async getAllProducts(): Promise<ResponseData<ProductEntity[]>> {
    try {
      let products: ProductEntity[] =
        await this.productService.getAllProductsPublished();
      products = products.filter(
        (product: ProductEntity): boolean =>
          product.status === ProductStatus.PUBLISHED
      );
      return new ResponseData<ProductEntity[]>(
        products,
        HttpMessage.OK,
        HttpStatus.OK
      );
    } catch (error) {
      return new ResponseData<ProductEntity[]>(
        null,
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private mapToProductOwnerDto(
    product: ProductEntity,
    owner: UserDto
  ): ProductOwnerDto {
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
      owner: {
        id: owner.id,
        version: owner.version,
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        phone: owner.phone,
        status: owner.status
      } as UserDto
    } as ProductOwnerDto;
  }
}
