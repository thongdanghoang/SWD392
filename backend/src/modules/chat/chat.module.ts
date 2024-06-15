import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ChatGateway} from './chat.gateway';
import {ChatService} from './chat.service';
import {Message, MessageSchema} from './schemas/message.schema';
import {Room, RoomSchema} from './schemas/room.schema';
import {ChatController} from './chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}])
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
