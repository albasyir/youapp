// user.service.ts
import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import dayjs from 'dayjs';

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

    let newUserData = createUserDto;

    if (newUserData.birthday) {
      newUserData = Object.assign(newUserData, this.getHoroscopeAndZodiacByUser(newUserData))
    }

    return new this
      .userModel(newUserData)
      .save()
      .catch((error: Error) => {
        this.logger.fatal("try save user", error, createUserDto );
        throw new InternalServerErrorException();
      })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    let newUserData = updateUserDto;

    if (newUserData.birthday) {
      newUserData = Object.assign(newUserData, this.getHoroscopeAndZodiacByUser(newUserData))
    }

    return this.userModel
      .findByIdAndUpdate(id, newUserData)
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

  getHoroscopeAndZodiacByUser(user: Pick<UserDocument, 'birthday'>) {
    const userDay = dayjs(user.birthday);
    const month = userDay.month() + 1;  
    const day = userDay.get('day');

    const horoscopeDates = [
      { startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, horoscope: 'Aquarius', zodiac: 'Water Bearer' },
      { startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, horoscope: 'Pisces', zodiac: 'Fish' },
      { startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, horoscope: 'Aries', zodiac: 'Ram' },
      { startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, horoscope: 'Taurus', zodiac: 'Bull' },
      { startMonth: 5, startDay: 21, endMonth: 6, endDay: 21, horoscope: 'Gemini', zodiac: 'Twins' },
      { startMonth: 6, startDay: 22, endMonth: 7, endDay: 22, horoscope: 'Cancer', zodiac: 'Crab' },
      { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, horoscope: 'Leo', zodiac: 'Lion' },
      { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, horoscope: 'Virgo', zodiac: 'Virgin' },
      { startMonth: 9, startDay: 23, endMonth: 10, endDay: 23, horoscope: 'Libra', zodiac: 'Balance' },
      { startMonth: 10, startDay: 24, endMonth: 11, endDay: 21, horoscope: 'Scorpio', zodiac: 'Scorpion' },
      { startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, horoscope: 'Sagittarius', zodiac: 'Archer' },
      { startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, horoscope: 'Capricorn', zodiac: 'Goat' },
    ];

    const { horoscope, zodiac } = horoscopeDates.find(date => {
      const isWithinRange =
        (month === date.startMonth && day >= date.startDay) ||
        (month === date.endMonth && day <= date.endDay);
      return isWithinRange;
    });

    return { horoscope, zodiac };
  }

}
