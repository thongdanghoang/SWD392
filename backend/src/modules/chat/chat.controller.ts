import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {ChatService} from './chat.service';
import {Room} from './schemas/room.schema';
import {Message} from './schemas/message.schema';
import {JwtAuthGuard} from '@5stones/nest-oidc';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms/:buyerId')
  async getRooms(@Param('buyerId') buyerId: string): Promise<Room[]> {
    return this.chatService.getRooms(buyerId);
  }

  @Get('messages/:roomId')
  async getMessages(@Param('roomId') roomId: string): Promise<Message[]> {
    return this.chatService.getMessages(roomId);
  }
}
