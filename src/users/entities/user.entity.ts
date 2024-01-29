import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'user' })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ unique: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  type: number;

  @Prop()
  createDate: Date;

  @Prop()
  updateDate: Date;

  @Prop()
  status: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
