export interface ExchangeRequestBodyDto {
  productId: number;
  exchangeByMoney: boolean;
  productsToExchangeId?: number[];
}
