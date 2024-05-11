import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class RegistrationRequestDto extends PickType(CreateUserDto, ['username', 'email', 'password']) {}