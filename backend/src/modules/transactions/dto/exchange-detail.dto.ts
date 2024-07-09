import {ExchangeStatus} from '../entities/ExchangeEntity';

export class ExchangeDetailDto {
  id?: number;
  version?: number;
  createdBy: string;
  modifiedBy: string;
  creationDate?: Date;
  lastModificationDate?: Date;
  status: ExchangeStatus;
  productRequest: number;
  userRequest: number;
  productsToBeExchanged: number[];
  targetUser: number;
  exchangeMoney?: number;
}
