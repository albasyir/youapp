import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/is-public.decorator';
import { RegistrationResponseDto } from './dto/registration-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() newUser: RegistrationRequestDto): Promise<RegistrationResponseDto> {
    return this.authService.registration(newUser);
  }

  @Public()
  @Post('login')
  @ApiProperty()
  @HttpCode(HttpStatus.ACCEPTED)
  async signIn(@Body() credential: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(credential);
  }
}