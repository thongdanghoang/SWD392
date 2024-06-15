import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({required: true})
  buyerId: string;

  @Prop({required: true})
  sellerId: string;

  @Prop({required: true})
  roomId: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
