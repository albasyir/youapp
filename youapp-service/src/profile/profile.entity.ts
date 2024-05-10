import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<Profile>;

@Schema()
export class Profile extends mongoose.Document {
  @Prop()
  displayName?: string;

  @Prop()
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

export const ProfileSchema = SchemaFactory.createForClass(Profile);