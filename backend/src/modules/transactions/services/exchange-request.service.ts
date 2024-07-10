import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ExchangeEntity, ExchangeStatus} from '../entities/ExchangeEntity';

@Injectable()
export class ExchangeRequestService {
  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangeReqRepo: Repository<ExchangeEntity>
  ) {}

  async createExchangeRequest(
    exchangeRequest: ExchangeEntity
  ): Promise<ExchangeEntity> {
    return await this.exchangeReqRepo.save(exchangeRequest);
  }

  async getExchangeRequest(exchangeId: number): Promise<ExchangeEntity> {
    return await this.exchangeReqRepo.findOneBy({id: exchangeId});
  }

  async getExchangeRequestsWithProduct(
    productId: number
  ): Promise<ExchangeEntity[]> {
    return await this.exchangeReqRepo.find({
      where: {productRequest: productId}
    });
  }

  async getProductsToBeExchangedIds(id: number): Promise<number[]> {
    const exchangeRequest: ExchangeEntity =
      await this.exchangeReqRepo.findOneBy({id});
    return exchangeRequest.productsToBeExchanged;
  }

  async updateExchangeRequestStatus(
    id: number,
    status: ExchangeStatus
  ): Promise<void> {
    await this.exchangeReqRepo.update(id, {status});
  }

  async save(exchangeRequest: ExchangeEntity): Promise<ExchangeEntity> {
    return await this.exchangeReqRepo.save(exchangeRequest);
  }
}
