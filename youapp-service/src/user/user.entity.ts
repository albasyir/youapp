import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

// Use this type for common usecase
export type UserDocument = mongoose.HydratedDocument<Omit<User, 'password'>>;

@Schema()
export class User extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  displayName?: string;

  @Prop({ enum: ['male', 'female'] })
  gender?: 'male' | 'female';

  @Prop()
  birthday?: Date;

  @Prop()
  height?: number;

  @Prop()
  weight?: number;

  @Prop()
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass<Omit<User, 'password'>>(User);