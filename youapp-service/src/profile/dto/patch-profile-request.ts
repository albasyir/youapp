import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class PatchProfileRequestDto extends OmitType(CreateUserDto, ['username', 'password', 'email']) {}
