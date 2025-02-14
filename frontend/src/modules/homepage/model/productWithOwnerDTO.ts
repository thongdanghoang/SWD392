import {UserDto} from '../../shared/models/userDto.ts';

export interface ProductWithOwnerDTO {
  id: string;
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
  suggestedPrice: number;
  category: string;
  status: ProductStatus;
  images: string[];
  video: string;
  isMyProduct: boolean;
  owner: UserDto;
}

export interface ProductDto {
  id: string;
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
  suggestedPrice: number;
  category: string;
  status: ProductStatus;
  images: string[];
  video: string;
  isMyProduct: boolean;
}
export interface CategoryDto {
  id: number;
  version: number;
  title: string;
  image: string;
}

export enum ProductStatus {
  REVIEWING = 'REVIEWING',
  PUBLISHED = 'PUBLISHED',
  EXCHANGING = 'EXCHANGING',
  EXCHANGED = 'EXCHANGED',
  BANNED = 'BANNED',
  REMOVED = 'REMOVED'
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
      return 'Không được duyệt';
    case ProductStatus.REMOVED:
      return 'Đã bị xóa';
    default:
      return 'Không xác định';
  }
};
