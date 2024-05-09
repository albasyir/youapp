import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject } from "class-validator";

export class RegistrationResponseDto {
  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  user: {
      id: string
      username: string;
      email: string;
  };

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}