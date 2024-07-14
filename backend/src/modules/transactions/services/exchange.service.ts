import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ExchangeEntity} from '../entities/ExchangeEntity';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangeReqRepo: Repository<ExchangeEntity>
  ) {}

  async getUserExchanges(userId: number): Promise<ExchangeEntity[]> {
    return await this.exchangeReqRepo.find({
      where: [{userRequest: userId}, {targetUser: userId}],
      order: {creationDate: 'DESC'}
    });
  }
}
