import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { Schema } from "mongoose"

export class GetUserDto extends OmitType(CreateUserDto, ['password']) {
  @ApiProperty({
    type: String
  })
  _id: any;

  @ApiProperty()
  __v?: number;

  @ApiProperty()
  horoscope: string;

  @ApiProperty()
  zodiac: string;
}