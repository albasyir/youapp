
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "aziz", description: "used to as user identifier" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: "abdulazizalbasyir119@gmail.com", description: "user email" })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: "user-password", description: "to authenticate user" })
  @IsNotEmpty()
  @IsString()
  password: string;
}