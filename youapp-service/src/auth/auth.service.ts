import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/app.config';
import { RegistrationResponseDto } from './dto/registration-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserDataOnToken } from './auth.guard';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private configService: ConfigService<Config>,
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  private get jwtConfig(): Config['jwt'] {
    return this.configService.getOrThrow('jwt')
  }

  async registration(newUser: RegistrationRequestDto): Promise<RegistrationResponseDto> {
    newUser.password = await bcrypt.hash(newUser.password, 10);

    const user = await this.userService.create(newUser);

    const jwt = await this
      .signTokenFromUser(user)
      .catch((e: Error) => {
        this.logger.fatal("try to sign JWT", e, {
          user
        });
        throw new InternalServerErrorException()
      });

    return {
      user: {
        email: user.email,
        id: user.id,
        username: user.username
      },
      token: jwt.token
    };
  }

  async login(credential: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this
      .userService
      .findByIdentifierWithPassowrdSelected(credential.identifier);
    
    if (!user) {
      this.logger.log("fail login because user not found", JSON.stringify(credential))
      throw new UnauthorizedException();
    }
    
    const isCorrectPassword = await bcrypt.compare(credential.password, user.password);

    if (!isCorrectPassword) {
      this.logger.log("fail login because incorrect password", {
        compare: {
          hash: user.password,
          with: credential.password
        }
      })
      throw new UnauthorizedException();
    }

    const jwt = await this.signTokenFromUser(user).catch((e) => {
      this.logger.fatal("error while signing token", user);
      throw new InternalServerErrorException()
    });
    
    return {
      user: {
        email: user.email,
        id: user.id,
        username: user.username
      },
      token: jwt.token
    };
  }

  async signTokenFromUser(user: Pick<User, '_id' | 'email'>) {
    const tokenDataStructure: UserDataOnToken = {
      sub: String(user._id)
    };

    return {
      token: this.jwtService.sign(tokenDataStructure),
    };
  }
}