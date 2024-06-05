import {UserDto} from '../../shared/models/userDto.ts';

export interface ProductDTO {
  id: string;
  version: number;
  createdBy: string;
  modifiedBy: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
  summary: string;
  suggestedPrice: number;
  category: string;
  status: ProductStatus;
  imageUrl?: string;
  owner: UserDto;
}

export enum ProductStatus {
  REVIEWING,
  PUBLISHED,
  EXCHANGING,
  EXCHANGED,
  BANNED,
  REMOVED
}

export const getProductStatusDisplay = (
  status: ProductStatus | undefined
): string => {
  switch (status) {
    case ProductStatus.REVIEWING:
      return 'Đang chờ duyệt';
    case ProductStatus.PUBLISHED:
      return 'Đã duyệt';
    case ProductStatus.EXCHANGING:
      return 'Đang trao đổi';
    case ProductStatus.EXCHANGED:
      return 'Đã trao đổi';
    case ProductStatus.BANNED:
      return 'Bị cấm';
    case ProductStatus.REMOVED:
      return 'Đã xóa';
    default:
      return 'Không xác định';
  }
};
