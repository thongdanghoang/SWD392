import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ChatGateway} from './chat.gateway';
import {ChatService} from './chat.service';
import {Message} from './schemas/message.schema';
import {Room} from './schemas/room.schema';
import {ChatController} from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Room])],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
