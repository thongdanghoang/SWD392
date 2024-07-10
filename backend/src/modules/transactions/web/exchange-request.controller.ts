import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
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

@Controller('exchanges-requests')
@UseGuards(JwtAuthGuard)
export class ExchangeRequestController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService,
    private readonly service: ExchangeRequestService
  ) {}

  @Post('/accept/:exchangeId')
  async acceptExchangeRequest(
    @Param('exchangeId') exchangeId: number
  ): Promise<ExchangeDetailDto> {
    const exchangeRequest: ExchangeEntity =
      await this.service.getExchangeRequest(exchangeId);
    exchangeRequest.status = ExchangeStatus.ACCEPTED;
    await this.updateProductStatus(
      exchangeRequest.productRequest,
      ProductStatus.EXCHANGED
    );
    await this.rejectOtherTransactions(
      exchangeId,
      exchangeRequest.productRequest
    );
    if (
      !exchangeRequest.productsToBeExchanged ||
      exchangeRequest.productsToBeExchanged.length === 0
    ) {
      return this.saveExchangeRequestAndUpdateNotifications(exchangeRequest);
    }
    return this.setStatusToProductsRequestAndSaveExchangeRequestAndUpdateNotifications(
      exchangeRequest,
      ProductStatus.EXCHANGED
    );
  }

  @Post('/reject/:id')
  async rejectExchangeRequest(
    @Param('id') exchangeId: number
  ): Promise<ExchangeDetailDto> {
    const exchangeRequest: ExchangeEntity =
      await this.service.getExchangeRequest(exchangeId);
    exchangeRequest.status = ExchangeStatus.REJECTED;
    if (
      !exchangeRequest.productsToBeExchanged ||
      exchangeRequest.productsToBeExchanged.length === 0
    ) {
      return this.saveExchangeRequestAndUpdateNotifications(exchangeRequest);
    }
    return this.setStatusToProductsRequestAndSaveExchangeRequestAndUpdateNotifications(
      exchangeRequest,
      ProductStatus.PUBLISHED
    );
  }

  @Post()
  async create(
    @Body() exchangeRequestBody: ExchangeRequestBodyDto
  ): Promise<ExchangeDetailDto> {
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
    try {
      const createdExchangeRequest: ExchangeEntity =
        await this.service.createExchangeRequest(exchangeRequest);
      await Promise.all([
        this.setStatusForProductsToExchange(exchangeRequestBody),
        this.sendNotificationToOwner(
          currentUser,
          productExchanged,
          createdExchangeRequest
        )
      ]);

      // Return the created exchange request
      return createdExchangeRequest;
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/:id')
  async getExchangeDetail(@Param('id') id: number): Promise<ExchangeDetailDto> {
    try {
      return await this.service.getExchangeRequest(id);
    } catch (error) {
      throw new HttpException(
        'Expectation Failed',
        HttpStatus.EXPECTATION_FAILED
      );
    }
  }

  private async updateProductStatus(
    productId: number,
    status: ProductStatus
  ): Promise<void> {
    const product: ProductEntity =
      await this.productService.getProductDetails(productId);
    product.status = status;
    await this.productService.updateProduct(product);
  }

  private async rejectOtherTransactions(
    exchangeId: number,
    productRequestId: number
  ): Promise<void> {
    const exchangeRequests: ExchangeEntity[] =
      await this.service.getExchangeRequestsWithProduct(productRequestId);
    for (const exchangeRequest of exchangeRequests) {
      if (exchangeRequest.id !== exchangeId) {
        exchangeRequest.status = ExchangeStatus.REJECTED;
        if (
          !exchangeRequest.productsToBeExchanged ||
          exchangeRequest.productsToBeExchanged.length === 0
        ) {
          void this.saveExchangeRequestAndUpdateNotifications(exchangeRequest);
        }
        void this.setStatusToProductsRequestAndSaveExchangeRequestAndUpdateNotifications(
          exchangeRequest,
          ProductStatus.PUBLISHED
        );
      }
    }
  }

  private async setStatusToProductsRequestAndSaveExchangeRequestAndUpdateNotifications(
    exchangeRequest: ExchangeEntity,
    status: ProductStatus
  ): Promise<ExchangeEntity> {
    try {
      await Promise.all(
        exchangeRequest.productsToBeExchanged
          .map((productId: number): number => productId)
          .map(async (productId: number): Promise<void> => {
            return this.productService.updateProductStatus(productId, status);
          })
      );
      return await this.saveExchangeRequestAndUpdateNotifications(
        exchangeRequest
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Expectation Failed',
        HttpStatus.EXPECTATION_FAILED
      );
    }
  }

  private async saveExchangeRequestAndUpdateNotifications(
    exchangeRequest: ExchangeEntity
  ): Promise<ExchangeEntity> {
    return await this.service
      .save(exchangeRequest)
      .then((exchangeRequest: ExchangeEntity) => {
        const currentUser: UserEntity = this.userService.getCurrentUser();
        currentUser.notifications = currentUser.notifications.filter(
          (notification: NotificationEntity): boolean =>
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
      userRequest: currentUser.id,
      createdBy: currentUser.firstName,
      modifiedBy: currentUser.firstName,
      status: ExchangeStatus.PENDING,
      productRequest: productExchanged.id,
      targetUser: (
        await this.productService.getProductDetails(productExchanged.id)
      ).owner
    };
    if (exchangeRequestBody.exchangeByMoney) {
      exchangeRequest = {
        ...exchangeRequest,
        exchangeMoney: 0
      };
    } else {
      exchangeRequest = await this.processExchangeRequestByProducts(
        exchangeRequestBody,
        exchangeRequest
      );
    }
    return exchangeRequest;
  }

  private async processExchangeRequestByProducts(
    exchangeRequestBody: ExchangeRequestBodyDto,
    exchangeRequest: ExchangeEntity
  ): Promise<ExchangeEntity> {
    const productsToExchange: ProductEntity[] = await Promise.all(
      exchangeRequestBody.productsToExchangeId.map(
        async (productId: number) =>
          await this.productService.getProductDetails(productId)
      )
    );
    return {
      ...exchangeRequest,
      exchangeMoney: 0,
      productsToBeExchanged: productsToExchange.map(
        (product: ProductEntity) => product.id
      )
    };
  }

  private async setStatusForProductsToExchange(
    exchangeRequestBody: ExchangeRequestBodyDto
  ): Promise<void> {
    if (!exchangeRequestBody.exchangeByMoney) {
      exchangeRequestBody.productsToExchangeId.forEach(
        (productId: number): void =>
          void this.productService
            .getProductDetails(productId)
            .then((product: ProductEntity): void => {
              product.status = ProductStatus.EXCHANGING;
              void this.productService.updateProduct(product);
            })
      );
    }
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
