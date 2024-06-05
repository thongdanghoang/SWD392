import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ExchangeEntity} from '../entities/ExchangeEntity';

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

  async save(exchangeRequest: ExchangeEntity): Promise<ExchangeEntity> {
    return await this.exchangeReqRepo.save(exchangeRequest);
  }
}
