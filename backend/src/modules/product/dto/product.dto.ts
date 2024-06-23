import {ProductEntity, ProductStatus} from '../entities/product.entity';
import {UserDto} from '../../user/user.dto';
import {PartialType} from '@nestjs/swagger';

export class CreateProductDto {
  status: ProductStatus;
  title: string;
  suggestedPrice: number;
  owner: number;
  createdBy: string;
  summary?: string;
  images?: string[];
  category?: number;
}

export class UpdateProductDto extends PartialType(ProductEntity) {}

export interface ProductWithOwnerDTO {
  id: number;
  version: number;
  createdBy: string;
  modifiedBy: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
  summary: string;
  images: string[];
  video: string;
  suggestedPrice: number;
  owner: UserDto;
  isMyProduct: boolean;
}

export interface ProductDto {
  id: number;
  version: number;
  createdBy: string;
  modifiedBy: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
  summary: string;
  images: string[];
  video: string;
  suggestedPrice: number;
  isMyProduct: boolean;
}
