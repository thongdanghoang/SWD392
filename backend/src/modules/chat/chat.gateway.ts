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

@WebSocketGateway(3001, {namespace: 'chat'})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    client: Socket,
    data: {buyerId: string; sellerId: string}
  ): Promise<Room> {
    const {buyerId, sellerId} = data;
    const room = await this.chatService.createRoom(buyerId, sellerId);
    void client.join(room.roomId);
    return room;
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: {roomId: string; sender: string; message: string}
  ): Promise<void> {
    const savedMessage = await this.chatService.saveMessage(
      data.roomId,
      data.sender,
      data.message
    );
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
