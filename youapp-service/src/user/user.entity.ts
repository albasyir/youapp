import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Profile } from "src/profile/profile.entity";

// Use this type for common usecase
export type UserDocument = mongoose.HydratedDocument<Omit<User, 'password'>>;

@Schema()
export class User extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: mongoose.Types.ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Profile.name })
  profile?: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass<Omit<User, 'password'>>(User);