import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {ChatService} from './chat.service';
import {Room} from './schemas/room.schema';
import {CreateRoomDto} from './schemas/create-room.dto';
import {CreateMessageDto} from './schemas/create-message.dto';

@WebSocketGateway(3001, {
  cors: {
    origin: 'https://thongdanghoang.id.vn/swapme',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createRoom')
  async handleCreateRoom(client: Socket, data: CreateRoomDto): Promise<Room> {
    const room = await this.chatService.createRoom(data);
    void client.join(room.roomId);
    return room;
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateMessageDto): Promise<void> {
    const savedMessage = await this.chatService.saveMessage(data);
    this.server.to(data.roomId).emit('newMessage', savedMessage);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const messages = await this.chatService.getMessages(roomId);
    client.emit('messages', messages);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string): void {
    void client.join(roomId);
    client.emit('joinRoom', `Joined room ${roomId}`);
  }
}
