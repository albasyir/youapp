import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profile.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema }
    ]),
    UserModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
