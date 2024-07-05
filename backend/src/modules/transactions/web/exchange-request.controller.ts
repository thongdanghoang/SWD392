import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {ProductService} from '../../product/services/product.service';
import {UsersService} from '../../user/users.service';
import {ExchangeRequestService} from '../services/exchange-request.service';
import {ExchangeRequestBodyDto} from '../dto/exchange-request-body.dto';
import {UserEntity} from '../../user/user.entity';
import {
  ProductEntity,
  ProductStatus
} from '../../product/entities/product.entity';
import {ExchangeEntity, ExchangeStatus} from '../entities/ExchangeEntity';
import {
  NotificationEntity,
  NotificationType
} from '../../user/notification.entity';
import {ExchangeDetailDto} from '../dto/exchange-detail.dto';

@Controller('exchanges')
@UseGuards(JwtAuthGuard)
export class ExchangeRequestController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService,
    private readonly service: ExchangeRequestService
  ) {}

  @Get('/:id')
  async getExchangeDetail(@Param('id') id: number): Promise<ExchangeDetailDto> {
    try {
      return await this.service.getExchangeRequest(id);
    } catch (error) {
      return error;
    }
  }

  @Post('/accept/:exchangeId')
  async acceptExchangeRequest(
    @Param('exchangeId') exchangeId: number
  ): Promise<ExchangeEntity> {
    const exchangeRequest: ExchangeEntity =
      await this.service.getExchangeRequest(exchangeId);
    exchangeRequest.status = ExchangeStatus.ACCEPTED;
    void this.productService
      .getProductDetails(exchangeRequest.productRequest)
      .then((product: ProductEntity) => {
        product.status = ProductStatus.EXCHANGED;
        void this.productService.updateProduct(product);
      });
    exchangeRequest.productsToBeExchanged.forEach(
      (productId: string): void =>
        void this.productService
          .getProductDetails(Number(productId))
          .then((product: ProductEntity) => {
            product.status = ProductStatus.EXCHANGED;
            void this.productService.updateProduct(product);
          })
    );
    return this.saveExchangeRequestAndUpdateNotifications(exchangeRequest);
  }

  @Post('/reject/:exchangeId')
  async rejectExchangeRequest(
    @Param('exchangeId') exchangeId: number
  ): Promise<ExchangeEntity> {
    const exchangeRequest: ExchangeEntity =
      await this.service.getExchangeRequest(exchangeId);
    exchangeRequest.status = ExchangeStatus.REJECTED;
    void this.productService
      .getProductDetails(exchangeRequest.productRequest)
      .then((product: ProductEntity) => {
        product.status = ProductStatus.PUBLISHED;
        void this.productService.updateProduct(product);
      });
    exchangeRequest.productsToBeExchanged.forEach(
      (productId: string): void =>
        void this.productService
          .getProductDetails(Number(productId))
          .then((product: ProductEntity) => {
            product.status = ProductStatus.PUBLISHED;
            void this.productService.updateProduct(product);
          })
    );
    return this.saveExchangeRequestAndUpdateNotifications(exchangeRequest);
  }

  @Post('/request')
  async create(
    @Body() exchangeRequestBody: ExchangeRequestBodyDto
  ): Promise<ExchangeEntity> {
    const currentUser: UserEntity = this.userService.getCurrentUser();
    const productExchanged: ProductEntity =
      await this.productService.getProductDetails(
        exchangeRequestBody.productId
      );
    const exchangeRequest: ExchangeEntity = await this.createExchangeRequest(
      currentUser,
      productExchanged,
      exchangeRequestBody
    );
    return await this.service
      .createExchangeRequest(exchangeRequest)
      .then((exchangeRequest: ExchangeEntity) => {
        void this.sendNotificationToOwner(
          currentUser,
          productExchanged,
          exchangeRequest
        );
        return exchangeRequest;
      });
  }

  private async saveExchangeRequestAndUpdateNotifications(
    exchangeRequest: ExchangeEntity
  ): Promise<ExchangeEntity> {
    return await this.service
      .save(exchangeRequest)
      .then((exchangeRequest: ExchangeEntity) => {
        // clear notifications
        const currentUser: UserEntity = this.userService.getCurrentUser();
        currentUser.notifications = currentUser.notifications.filter(
          (notification: NotificationEntity) =>
            notification.exchangeId !== exchangeRequest.id
        );
        void this.userService.save(currentUser);
        return exchangeRequest;
      });
  }

  private async createExchangeRequest(
    currentUser: UserEntity,
    productExchanged: ProductEntity,
    exchangeRequestBody: ExchangeRequestBodyDto
  ): Promise<ExchangeEntity> {
    let exchangeRequest: ExchangeEntity = {
      createdBy: currentUser.firstName,
      modifiedBy: currentUser.firstName,
      status: ExchangeStatus.PENDING,
      productRequest: productExchanged.id,
      productsToBeExchanged: []
    };
    if (exchangeRequestBody.exchangeByMoney) {
      exchangeRequest = {
        ...exchangeRequest,
        exchangeMoney: 0
      };
    } else {
      const productsToExchange: ProductEntity[] = await Promise.all(
        exchangeRequestBody.productsToExchangeId.map(
          async (productId: number) =>
            await this.productService.getProductDetails(productId)
        )
      );
      exchangeRequest = {
        ...exchangeRequest,
        productsToBeExchanged: productsToExchange.map(
          (product: ProductEntity) => product.id.toString()
        )
      };
    }
    return exchangeRequest;
  }

  private async sendNotificationToOwner(
    currentUser: UserEntity,
    productExchanged: ProductEntity,
    exchangeRequest: ExchangeEntity
  ): Promise<void> {
    this.userService
      .findById(productExchanged.owner)
      .then((owner: UserEntity): void => {
        owner.notifications.push({
          type: NotificationType.EXCHANGE_REQUEST,
          title: `${currentUser.firstName} ${currentUser.lastName}`,
          content: `muốn giao dịch với bạn!`,
          user: owner,
          exchangeId: exchangeRequest.id
        } as NotificationEntity);
        void this.userService.save(owner);
      })
      .catch((error: Error): void => {
        throw error;
      });
  }
}
