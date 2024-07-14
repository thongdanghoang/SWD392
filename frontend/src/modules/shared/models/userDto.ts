export interface UserDto {
  id: number;
  version: number;
  firstName: string;
  lastName: string;
  avatar: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  addressDetail: string;
  email: string;
  phone: string;
  notifications: NotificationDto[];
}

export interface NotificationDto {
  id: string;
  type: NotificationType;
  creationDate: Date;
  title: string;
  content: string;
  exchangeId: string;
}

export enum NotificationType {
  EXCHANGE_REQUEST = 'EXCHANGE_REQUEST'
}
