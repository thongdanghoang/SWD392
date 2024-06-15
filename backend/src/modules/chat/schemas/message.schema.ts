import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({required: true})
  roomId: string;

  @Prop({required: true})
  sender: string;

  @Prop({required: true})
  message: string;

  @Prop({default: Date.now})
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
