import {ProductEntity, ProductStatus} from '../entities/product.entity';
import {UserDto} from '../../user/user.dto';
import {PartialType} from '@nestjs/swagger';

export class CreateProductDto {
  title: string;
  isGiveAway: boolean;
  isUsed: boolean;
  suggestedPrice: number;
  summary: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  addressDetail: string;
  images: string[];
  video: string;
  category: number;
  owner: number;
  createdBy: string;
  modifiedBy: string;
  status: ProductStatus;
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
  isGiveAway: boolean;
  isUsed: boolean;
  summary: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  addressDetail: string;
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
  isGiveAway: boolean;
  isUsed: boolean;
  summary: string;
  images: string[];
  video: string;
  category: number;
  suggestedPrice: number;
  isMyProduct: boolean;
}

export interface ProductSearchCriteria {
  keyword: string;
  categoryId: number;
}
