import {ProductStatus} from './product.entity';

export class CreateProductDto {
  createdBy: string;
  status: ProductStatus;
  title: string;
  summary?: string;
  suggestedPrice: number;
  owner: number;
  category?: number;
}
