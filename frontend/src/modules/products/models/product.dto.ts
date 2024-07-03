import {AddressDto} from '../components/AddressFormModal.tsx';

export interface ProductDTO extends AddressDto {
  id?: string;
  version?: number;
  title: string;
  isGiveAway: boolean;
  isUsed: boolean;
  suggestedPrice: number;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  addressDetail: string;
  images: string[];
  video: string;
  category: string;
  summary: string;
}
