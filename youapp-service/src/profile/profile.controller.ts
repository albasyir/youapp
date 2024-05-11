import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { PatchProfileRequestDto } from './dto/patch-profile-request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@Controller('profile')
  @ApiTags('profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(
    private profileService: ProfileService,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  public patchUserProfile(@Body() newUserProfile: PatchProfileRequestDto): Promise<void> {
    this.profileService.patchUserProfile(newUserProfile);

    return;
  }
}
