import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<Omit<User, 'password'>>;

export enum Gender {
  male = 'male',
  female = 'female'
}

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

  @Prop({
    enum: Object.values(Gender),
    type: String
  })
  gender?: Gender;

  @Prop()
  birthday?: Date;

  @Prop()
  height?: number;

  @Prop()
  weight?: number;

  @Prop()
  image?: string;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;
}

export const UserSchema = SchemaFactory.createForClass<Omit<User, 'password'>>(User)