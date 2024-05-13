import { Body, Controller, Get, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { PatchProfileRequestDto } from './dto/patch-profile-request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { GetProfileResponse } from './dto/get-profile-response';

@Controller('profile')
@ApiTags('profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(
    private profileService: ProfileService,
  ) { }
  
  @Get()
  @HttpCode(HttpStatus.OK)
  async get(): Promise<GetProfileResponse> {
    const currentUser = await this.profileService.getCurrentProfileOrFail();
    return currentUser;
  }

  @Patch()
  @HttpCode(HttpStatus.ACCEPTED)
  async patch(@Body() newUserProfile: PatchProfileRequestDto): Promise<GetProfileResponse> {
    return this.profileService.patchUserProfile(newUserProfile);
  }
}
