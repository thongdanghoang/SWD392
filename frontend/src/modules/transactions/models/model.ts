export enum ExchangeStatusDto {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
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
  userRequest: number;
  productsToBeExchanged: string[];
  targetUser: number;
  exchangeMoney?: number;
}
