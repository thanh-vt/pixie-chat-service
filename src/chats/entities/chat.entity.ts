import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ collection: 'chat' })
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
