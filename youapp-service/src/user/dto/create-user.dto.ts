
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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

  @ApiProperty({ example: "Aziz", description: "display name of the user", required: false })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({ example: "male", description: "gender of the user", enum: ['male', 'female'], required: false })
  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: 'male' | 'female';

  @ApiProperty({ example: "1998-11-08", description: "birthday of the user", required: false })
  @IsOptional()
  @IsDate()
  birthday?: Date;

  @ApiProperty({ example: 180, description: "height of the user", required: false })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ example: 70, description: "weight of the user", required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ example: "base64:xxxx", description: "profile image of the user", required: false })
  @IsOptional()
  @IsString()
  image?: string;
}