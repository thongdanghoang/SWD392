export enum ExchangeStatusDto {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXCHANGING = 'EXCHANGING'
}

export function getExchangeStatusText(
  status: ExchangeStatusDto | undefined
): string {
  switch (status) {
    case ExchangeStatusDto.PENDING:
      return 'Đã gửi yêu cầu, chờ phản hồi';
    case ExchangeStatusDto.ACCEPTED:
      return 'Đã được chấp nhận';
    case ExchangeStatusDto.REJECTED:
      return 'Đã bị từ chối';
    case ExchangeStatusDto.EXCHANGING:
      return 'Đang giao dịch';
    default:
      return '';
  }
}

export interface ExchangeRequestDto {
  id: number;
  version: number;
  createdBy: string;
  modifiedBy: string;
  creationDate?: Date;
  lastModificationDate?: Date;
  status: ExchangeStatusDto;
  productRequest: number;
  productsToBeExchanged: string[];
  exchangeMoney?: number;
}
