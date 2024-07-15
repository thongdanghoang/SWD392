import {IsString} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  roomId: string;

  @IsString()
  sender: string;

  @IsString()
  message: string;
}
