import {ProductStatus} from './product.entity';
import {UserDto} from '../user/user.dto';

export class CreateProductDto {
  status: ProductStatus;
  title: string;
  suggestedPrice: number;
  owner: number;
  createdBy: string;
  summary?: string;
  category?: number;
}

export interface ProductOwnerDto {
  id: number;
  version: number;
  createdBy: string;
  modifiedBy: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
  summary: string;
  suggestedPrice: number;
  owner: UserDto;
}
