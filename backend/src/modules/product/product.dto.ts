import {ProductStatus} from './product.entity';

export class CreateProductDto {
  status: ProductStatus;
  title: string;
  suggestedPrice: number;
  owner: number;
  createdBy: string;
  summary?: string;
  category?: number;
}
