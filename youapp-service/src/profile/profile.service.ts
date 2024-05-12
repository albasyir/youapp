import { Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PatchProfileRequestDto } from './dto/patch-profile-request';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserDataOnToken } from 'src/auth/auth.guard';
import { UserDocument } from 'src/user/user.entity';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private userService: UserService,
  ) { }

  async getCurrentProfileIdOrFail(): Promise<string> {
    const user: UserDataOnToken = this.request['user'];

    if (!user || !user.sub) throw new InternalServerErrorException("can't find current user");

    return user.sub;
  }

  async getCurrentProfileOrFail(): Promise<UserDocument> {
    const currentUserId = await this.getCurrentProfileIdOrFail();

    const user = await this.userService.findByUserId(currentUserId).catch(e => {
      this.logger.fatal(e);
      throw new InternalServerErrorException("fail when find your account");
    });

    if (!user) {
      this.logger.warn("this method should expect user document", { currentUserId });
      throw new UnauthorizedException("user is not found");
    }

    return user;
  }
  
  async patchUserProfile(newUserProfile: PatchProfileRequestDto): Promise<UserDocument> {
    const currentUser = await this.getCurrentProfileOrFail();

    const userWithNewProfile = Object.assign(currentUser, newUserProfile);

    return this.userService.update(currentUser.id, userWithNewProfile);
  }
}
