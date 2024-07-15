import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ChatService} from './chat.service';
import {Message} from './schemas/message.schema';
import {Room} from './schemas/room.schema';
import {JwtAuthGuard} from '@5stones/nest-oidc';
import {CreateRoomDto} from './schemas/create-room.dto';
import {CreateMessageDto} from './schemas/create-message.dto';

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

  @Post('rooms')
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.chatService.createRoom(createRoomDto);
  }

  @Post('messages')
  async createMessage(
    @Body() createMessageDto: CreateMessageDto
  ): Promise<Message> {
    return this.chatService.saveMessage(createMessageDto);
  }
}
