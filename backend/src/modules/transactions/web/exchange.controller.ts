import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {UsersService} from '../../user/users.service';
import {UserEntity} from '../../user/user.entity';
import {ExchangeDetailDto} from '../dto/exchange-detail.dto';
import {ExchangeService} from '../services/exchange.service';
import {ProductService} from '../../product/services/product.service';

@Controller('exchanges')
@UseGuards(JwtAuthGuard)
export class ExchangeController {
  constructor(
    private readonly userService: UsersService,
    private readonly productService: ProductService,
    private readonly service: ExchangeService
  ) {}

  @Get()
  async getMyExchanges(): Promise<ExchangeDetailDto[]> {
    const currentUser: UserEntity = this.userService.getCurrentUser();
    try {
      return await this.service.getUserExchanges(currentUser.id);
    } catch (error) {
      throw new HttpException(
        'Expectation Failed',
        HttpStatus.EXPECTATION_FAILED
      );
    }
  }
}
