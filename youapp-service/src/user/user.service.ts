// user.service.ts
import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const existUser = await this.findUserByEmailOrUsername(createUserDto);

    if (existUser) {
      this.logger.log("user has exist", {
        createUserDto,
        existUser
      });
      throw new ConflictException();
    }

    return new this
      .userModel(createUserDto)
      .save()
      .catch((error: Error) => {
        this.logger.fatal("try save user", error, createUserDto );
        throw new InternalServerErrorException();
      })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto)
      .exec()
      .catch((error: Error) => {
        this.logger.fatal(error);
        throw new InternalServerErrorException();
      })
  }

  async findByUserId(id: string) {
    return this.userModel.findOne({ _id: id })
  }

  async findUserByEmailOrUsername(payload: Pick<User, 'username' | 'email'>): Promise<UserDocument> {
    const user = this.userModel.findOne({
        $or: [{ email: payload.email }, { username: payload.username }],
      })
      .catch((error: Error) => {
        this.logger.fatal(error);
        throw new InternalServerErrorException();
      })

    return user;
  }

  async findUserByIdentifier(identifier: string): Promise<UserDocument> {
    const user = await this.findUserByEmailOrUsername({
      email: identifier,
      username: identifier,
    });

    return user;
  }


  async findByIdentifierWithPassowrdSelected(
    identifier: string
  ): Promise<UserDocument & Pick<User, "password"> | null> {
    const user = await this.userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })
      .select('+password')
      .catch((error: Error) => {
        this.logger.fatal(error);
        throw new InternalServerErrorException();
      })
    
    if (!user) return null;
    
    if (user.$isEmpty('password')) {
      this.logger.fatal("why is that user has't password ?", {
        id: user.id,
        email: user.email,
        password: user['password']
      });
      throw new InternalServerErrorException();
    }

    const userWithPassword = user as UserDocument & Pick<User, "password">;

    return userWithPassword;
  }
}
