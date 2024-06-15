import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Message} from './schemas/message.schema';
import {Room} from './schemas/room.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    @InjectModel(Room.name) private readonly roomModel: Model<Room>
  ) {}

  async createRoom(buyerId: string, sellerId: string): Promise<Room> {
    const existingRoom = await this.roomModel.findOne({buyerId, sellerId});
    if (existingRoom) {
      return existingRoom;
    }
    const roomId = `${buyerId}-${sellerId}`;
    const newRoom = new this.roomModel({buyerId, sellerId, roomId});
    return newRoom.save();
  }

  async getMessages(roomId: string): Promise<Message[]> {
    return this.messageModel.find({roomId}).exec();
  }

  async saveMessage(
    roomId: string,
    sender: string,
    message: string
  ): Promise<Message> {
    const newMessage = new this.messageModel({roomId, sender, message});
    return newMessage.save();
  }
  async getRooms(userId: string): Promise<Room[]> {
    return this.roomModel
      .find({
        $or: [{buyerId: userId}, {sellerId: userId}]
      })
      .exec();
  }
}
