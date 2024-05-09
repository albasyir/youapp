import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "aziz", description: "can be email / username" })
  identifier: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "user-password", description: "some secret random user identity verificator" })
  password: string;
}