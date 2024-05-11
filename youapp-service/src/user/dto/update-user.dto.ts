import { IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {
  @ApiProperty({ example: "user-password", description: "to authenticate user" })
  @IsOptional()
  @IsString()
  password?: string;
}