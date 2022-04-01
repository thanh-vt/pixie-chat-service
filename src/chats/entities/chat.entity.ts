import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ type: [String], required: true })
  userIds: string[];

  @Prop()
  createDate: Date;

  @Prop()
  updateDate: Date;

  @Prop()
  status: number;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
