import {ExchangeStatus} from '../entities/ExchangeEntity';

export class ExchangeDetailDto {
  id?: number;
  version?: number;
  userRequest: number;
  createdBy: string;
  modifiedBy: string;
  creationDate?: Date;
  lastModificationDate?: Date;
  status: ExchangeStatus;
  productRequest: number;
  productsToBeExchanged: number[];
  exchangeMoney?: number;
}
