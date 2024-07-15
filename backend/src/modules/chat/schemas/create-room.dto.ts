import {IsString} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  buyerId: string;

  @IsString()
  sellerId: string;
}
