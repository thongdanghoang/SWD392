import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Message} from './schemas/message.schema';
import {Room} from './schemas/room.schema';
import {CreateRoomDto} from './schemas/create-room.dto';
import {CreateMessageDto} from './schemas/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const {buyerId, sellerId} = createRoomDto;
    const roomId = `${buyerId}-${sellerId}`;
    let room = await this.roomRepository.findOne({where: {roomId}});
    if (!room) {
      room = this.roomRepository.create({buyerId, sellerId, roomId});
      room = await this.roomRepository.save(room);
    }
    return room;
  }

  async getMessages(roomId: string): Promise<Message[]> {
    return this.messageRepository.find({where: {roomId}});
  }

  async saveMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async getRooms(userId: string): Promise<Room[]> {
    return this.roomRepository.find({
      where: [{buyerId: userId}, {sellerId: userId}]
    });
  }
}
